// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {GenesisNFT} from "../src/GenesisNFT.sol";

contract GenesisNFTTest is Test {
    GenesisNFT public nft;
    address public treasury = makeAddr("treasury");
    address public alice = makeAddr("alice");
    address public bob = makeAddr("bob");

    string constant BASE_URI = "ipfs://QmTest/";

    function setUp() public {
        nft = new GenesisNFT(treasury, BASE_URI);
        vm.deal(alice, 100 ether);
        vm.deal(bob, 100 ether);
    }

    // --- Free community mint ---

    function testFreeMintWorks() public {
        vm.prank(alice);
        nft.mintCommunity();
        assertEq(nft.ownerOf(1), alice);
        assertEq(nft.communityMinted(), 1);
        assertTrue(nft.hasClaimedFree(alice));
    }

    function testFreeMintOnePerWallet() public {
        vm.prank(alice);
        nft.mintCommunity();
        vm.prank(alice);
        vm.expectRevert(GenesisNFT.AlreadyClaimedFree.selector);
        nft.mintCommunity();
    }

    function testFreeMintDifferentWalletsOk() public {
        vm.prank(alice);
        nft.mintCommunity();
        vm.prank(bob);
        nft.mintCommunity();
        assertEq(nft.communityMinted(), 2);
    }

    function testCommunityCap222Enforced() public {
        for (uint256 i = 0; i < 222; i++) {
            address w = address(uint160(0x1000 + i));
            vm.prank(w);
            nft.mintCommunity();
        }
        assertEq(nft.communityMinted(), 222);
        vm.prank(makeAddr("late"));
        vm.expectRevert(GenesisNFT.CommunityAllocationExhausted.selector);
        nft.mintCommunity();
    }

    // --- Public mint ---

    function testPublicMintWorksAtExactPrice() public {
        vm.prank(alice);
        nft.mintPublic{value: 0.001 ether}();
        assertEq(nft.ownerOf(1), alice);
        assertEq(nft.publicMinted(), 1);
        assertEq(address(nft).balance, 0.001 ether);
    }

    function testPublicMintRejectsUnderpayment() public {
        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(GenesisNFT.IncorrectPayment.selector, 0.001 ether, 0.0005 ether));
        nft.mintPublic{value: 0.0005 ether}();
    }

    function testPublicMintRejectsOverpayment() public {
        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(GenesisNFT.IncorrectPayment.selector, 0.001 ether, 0.002 ether));
        nft.mintPublic{value: 0.002 ether}();
    }

    function testPublicMintRejectsZeroValue() public {
        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(GenesisNFT.IncorrectPayment.selector, 0.001 ether, 0));
        nft.mintPublic{value: 0}();
    }

    function testPublicCap1800Enforced() public {
        for (uint256 i = 0; i < 1800; i++) {
            vm.prank(alice);
            nft.mintPublic{value: 0.001 ether}();
        }
        assertEq(nft.publicMinted(), 1800);
        vm.prank(alice);
        vm.expectRevert(GenesisNFT.PublicAllocationExhausted.selector);
        nft.mintPublic{value: 0.001 ether}();
    }

    // --- Treasury mint ---

    function testTreasuryMintGoesToTreasury() public {
        nft.mintTreasury();
        assertEq(nft.ownerOf(1), treasury);
        assertEq(nft.treasuryMinted(), 1);
    }

    function testTreasuryMintOnlyOwner() public {
        vm.prank(alice);
        vm.expectRevert();
        nft.mintTreasury();
    }

    function testTreasuryCap200Enforced() public {
        for (uint256 i = 0; i < 200; i++) {
            nft.mintTreasury();
        }
        assertEq(nft.treasuryMinted(), 200);
        vm.expectRevert(GenesisNFT.TreasuryAllocationExhausted.selector);
        nft.mintTreasury();
    }

    // --- Global cap 2,222 ---

    function testMaxSupply2222Enforced() public {
        // Fill all three allocations: 222 free + 1800 public + 200 treasury.
        for (uint256 i = 0; i < 222; i++) {
            address w = address(uint160(0x2000 + i));
            vm.prank(w);
            nft.mintCommunity();
        }
        for (uint256 i = 0; i < 1800; i++) {
            vm.prank(alice);
            nft.mintPublic{value: 0.001 ether}();
        }
        for (uint256 i = 0; i < 200; i++) {
            nft.mintTreasury();
        }
        assertEq(nft.totalSupply(), 2222);
        // The 2,223rd mint must revert (public allocation is also exhausted).
        vm.prank(alice);
        vm.expectRevert(GenesisNFT.PublicAllocationExhausted.selector);
        nft.mintPublic{value: 0.001 ether}();
    }

    // --- Pause ---

    function testPauseBlocksMints() public {
        nft.pause();
        vm.prank(alice);
        vm.expectRevert();
        nft.mintCommunity();
        vm.prank(alice);
        vm.expectRevert();
        nft.mintPublic{value: 0.001 ether}();
        vm.expectRevert();
        nft.mintTreasury();
        nft.unpause();
        vm.prank(alice);
        nft.mintCommunity();
        assertEq(nft.communityMinted(), 1);
    }

    function testPauseOnlyOwner() public {
        vm.prank(alice);
        vm.expectRevert();
        nft.pause();
    }

    // --- Tiers & metadata ---

    function testTierOf() public {
        // Mint 1,223 tokens: token 1 Elite, 23 Gold, 223 Silver, 1223 Bronze.
        for (uint256 i = 0; i < 222; i++) {
            address w = address(uint160(0x3000 + i));
            vm.prank(w);
            nft.mintCommunity();
        }
        for (uint256 i = 0; i < 1001; i++) {
            vm.prank(alice);
            nft.mintPublic{value: 0.001 ether}();
        }
        assertEq(uint256(nft.tierOf(1)), uint256(GenesisNFT.Tier.Elite));
        assertEq(uint256(nft.tierOf(22)), uint256(GenesisNFT.Tier.Elite));
        assertEq(uint256(nft.tierOf(23)), uint256(GenesisNFT.Tier.Gold));
        assertEq(uint256(nft.tierOf(222)), uint256(GenesisNFT.Tier.Gold));
        assertEq(uint256(nft.tierOf(223)), uint256(GenesisNFT.Tier.Silver));
        assertEq(uint256(nft.tierOf(1222)), uint256(GenesisNFT.Tier.Silver));
        assertEq(uint256(nft.tierOf(1223)), uint256(GenesisNFT.Tier.Bronze));
    }

    function testTokenURIUsesBaseURIPlusTokenId() public {
        vm.prank(alice);
        nft.mintCommunity();
        assertEq(nft.tokenURI(1), string.concat(BASE_URI, "1"));
    }

    function testWithdrawSendsBnbToOwner() public {
        vm.prank(alice);
        nft.mintPublic{value: 0.001 ether}();
        uint256 before = address(this).balance;
        nft.withdraw();
        assertEq(address(this).balance, before + 0.001 ether);
        assertEq(address(nft).balance, 0);
    }

    receive() external payable {}
}
