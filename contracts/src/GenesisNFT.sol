// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

/// @title Aurenix Genesis NFT
/// @author AURENIX
/// @notice ERC-721 membership NFT for the AURENIX work economy.
/// @dev Max supply 2,222, split on-chain: 222 community (free, one per
/// wallet), 1,800 public (0.001 BNB each, exact price), 200 treasury reserve
/// (owner-only, to the treasury address set at deployment).
///
/// Tiers are deterministic by tokenId so rarity is verifiable on-chain:
///   tokenId 1-22      -> Elite    (22)
///   tokenId 23-222    -> Gold     (200)
///   tokenId 223-1222  -> Silver   (1,000)
///   tokenId 1223-2222 -> Bronze   (1,000)
/// Token metadata lives at `baseURI/<tokenId>` (JSON) and includes the tier
/// as an attribute; `tierOf(tokenId)` exposes the same tier on-chain.
///
/// IMPORTANT — NO GUARANTEED INCOME: holding this NFT entitles the holder
/// to no guaranteed income, no guaranteed token allocation, no price, no
/// listing and no return of any kind. It is a membership / access token
/// only. Rewards, if any, are earned through verified completed work and
/// are governed by the separate RewardDistributor / MissionEscrow contracts.
contract GenesisNFT is ERC721, Ownable, Pausable, ReentrancyGuard {
    using Strings for uint256;

    /// @notice Membership tiers, from standard to legendary.
    enum Tier {
        Bronze,
        Silver,
        Gold,
        Elite
    }

    /// @notice Absolute maximum supply. Minting beyond this is impossible.
    uint256 public constant MAX_SUPPLY = 2222;
    /// @notice Free community allocation.
    uint256 public constant COMMUNITY_SUPPLY = 222;
    /// @notice Paid public allocation.
    uint256 public constant PUBLIC_SUPPLY = 1800;
    /// @notice Treasury reserve allocation.
    uint256 public constant TREASURY_SUPPLY = 200;
    /// @notice Exact public mint price in wei (0.001 BNB).
    uint256 public constant PUBLIC_PRICE = 0.001 ether;

    /// @notice Address that receives treasury-reserve mints. Set once at deploy.
    address public immutable treasury;
    /// @notice Base URI for token metadata JSON (`baseURI/<tokenId>`).
    string private _baseTokenURI;

    uint256 private _nextTokenId = 1;
    uint256 public communityMinted;
    uint256 public publicMinted;
    uint256 public treasuryMinted;
    /// @notice Tracks wallets that already used their one free community mint.
    mapping(address => bool) public hasClaimedFree;

    event CommunityMint(address indexed minter, uint256 indexed tokenId);
    event PublicMint(address indexed minter, uint256 indexed tokenId);
    event TreasuryMint(address indexed to, uint256 indexed tokenId);
    event BaseURIUpdated(string newBaseURI);
    event FundsWithdrawn(address indexed to, uint256 amount);

    error MaxSupplyReached();
    error CommunityAllocationExhausted();
    error PublicAllocationExhausted();
    error TreasuryAllocationExhausted();
    error AlreadyClaimedFree();
    error IncorrectPayment(uint256 expected, uint256 received);

    /// @param treasury_ Address receiving the 200 treasury-reserve mints.
    /// @param baseURI_ Initial metadata base URI (e.g. ipfs://<cid>/).
    constructor(address treasury_, string memory baseURI_) ERC721("Aurenix Genesis", "AUNXG") Ownable(msg.sender) {
        require(treasury_ != address(0), "GenesisNFT: treasury is zero address");
        treasury = treasury_;
        _baseTokenURI = baseURI_;
    }

    /// @notice Total number of tokens minted so far.
    function totalMinted() public view returns (uint256) {
        return _nextTokenId - 1;
    }

    /// @notice Total supply minted so far (alias of totalMinted).
    function totalSupply() public view returns (uint256) {
        return totalMinted();
    }

    /// @notice Returns the tier of a token. Reverts for nonexistent tokens.
    function tierOf(uint256 tokenId) public view returns (Tier) {
        _requireOwned(tokenId);
        if (tokenId <= 22) return Tier.Elite;
        if (tokenId <= 222) return Tier.Gold;
        if (tokenId <= 1222) return Tier.Silver;
        return Tier.Bronze;
    }

    /// @notice Free community mint: one per wallet, while the 222 allocation remains.
    function mintCommunity() external nonReentrant whenNotPaused {
        if (hasClaimedFree[msg.sender]) revert AlreadyClaimedFree();
        if (communityMinted >= COMMUNITY_SUPPLY) revert CommunityAllocationExhausted();
        hasClaimedFree[msg.sender] = true;
        communityMinted += 1;
        uint256 tokenId = _mintNext(msg.sender);
        emit CommunityMint(msg.sender, tokenId);
    }

    /// @notice Public mint at exactly 0.001 BNB.
    /// @dev Excess payment is REJECTED (transaction reverts) rather than
    /// refunded, so a buyer can never overpay by mistake. Send exactly
    /// 0.001 BNB.
    function mintPublic() external payable nonReentrant whenNotPaused {
        if (msg.value != PUBLIC_PRICE) revert IncorrectPayment(PUBLIC_PRICE, msg.value);
        if (publicMinted >= PUBLIC_SUPPLY) revert PublicAllocationExhausted();
        publicMinted += 1;
        uint256 tokenId = _mintNext(msg.sender);
        emit PublicMint(msg.sender, tokenId);
    }

    /// @notice Owner-only mint of one treasury-reserve NFT to the treasury
    /// address, while the 200 allocation remains.
    function mintTreasury() external onlyOwner nonReentrant whenNotPaused {
        if (treasuryMinted >= TREASURY_SUPPLY) revert TreasuryAllocationExhausted();
        treasuryMinted += 1;
        uint256 tokenId = _mintNext(treasury);
        emit TreasuryMint(treasury, tokenId);
    }

    /// @notice Owner-only pause of all minting.
    function pause() external onlyOwner {
        _pause();
    }

    /// @notice Owner-only unpause.
    function unpause() external onlyOwner {
        _unpause();
    }

    /// @notice Owner-only update of the metadata base URI.
    function setBaseURI(string calldata newBaseURI) external onlyOwner {
        _baseTokenURI = newBaseURI;
        emit BaseURIUpdated(newBaseURI);
    }

    /// @notice Owner-only withdrawal of accumulated public-mint BNB.
    function withdraw() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "GenesisNFT: nothing to withdraw");
        (bool ok, ) = payable(owner()).call{value: balance}("");
        require(ok, "GenesisNFT: withdraw failed");
        emit FundsWithdrawn(owner(), balance);
    }

    /// @notice Metadata URI: baseURI + tokenId (e.g. ipfs://<cid>/42).
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        return string.concat(_baseTokenURI, tokenId.toString());
    }

    function _mintNext(address to) internal returns (uint256) {
        if (_nextTokenId > MAX_SUPPLY) revert MaxSupplyReached();
        uint256 tokenId = _nextTokenId;
        _nextTokenId += 1;
        _safeMint(to, tokenId);
        return tokenId;
    }
}
