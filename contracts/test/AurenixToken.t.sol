// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {AurenixToken} from "../src/AurenixToken.sol";

contract AurenixTokenTest is Test {
    AurenixToken public token;
    address public alice = makeAddr("alice");
    address public bob = makeAddr("bob");

    function setUp() public {
        token = new AurenixToken();
    }

    function testTotalSupplyIs100M() public view {
        assertEq(token.totalSupply(), 100_000_000 * 10 ** 18);
        assertEq(token.TOTAL_SUPPLY(), 100_000_000 * 10 ** 18);
    }

    function testDecimals18() public view {
        assertEq(token.decimals(), 18);
    }

    function testNameAndSymbol() public view {
        assertEq(token.name(), "Aurenix");
        assertEq(token.symbol(), "AUNX");
    }

    function testDeployerHoldsFullSupply() public view {
        assertEq(token.balanceOf(address(this)), 100_000_000 * 10 ** 18);
    }

    function testTransfersWork() public {
        token.transfer(alice, 1_000 * 10 ** 18);
        assertEq(token.balanceOf(alice), 1_000 * 10 ** 18);
        vm.prank(alice);
        token.transfer(bob, 400 * 10 ** 18);
        assertEq(token.balanceOf(bob), 400 * 10 ** 18);
        assertEq(token.balanceOf(alice), 600 * 10 ** 18);
    }

    function testTransferFromWithAllowanceWorks() public {
        vm.prank(alice);
        token.approve(bob, 100 * 10 ** 18);
        // alice has no balance yet; fund her first
        token.transfer(alice, 100 * 10 ** 18);
        vm.prank(bob);
        token.transferFrom(alice, bob, 100 * 10 ** 18);
        assertEq(token.balanceOf(bob), 100 * 10 ** 18);
    }

    function testTransferMoreThanBalanceReverts() public {
        vm.prank(alice);
        vm.expectRevert();
        token.transfer(bob, 1 * 10 ** 18);
    }

    /// @notice Proves there is NO mint function: the contract exposes no
    /// `mint(address,uint256)` selector, so any call to it reverts.
    function testNoMintFunctionExists() public {
        (bool ok, ) = address(token).call(abi.encodeWithSignature("mint(address,uint256)", alice, 1));
        assertFalse(ok, "mint(address,uint256) should not exist");
        (ok, ) = address(token).call(abi.encodeWithSignature("mint(uint256)", 1));
        assertFalse(ok, "mint(uint256) should not exist");
    }

    /// @notice Proves there is NO burn function callable by anyone.
    function testNoBurnFunctionExists() public {
        (bool ok, ) = address(token).call(abi.encodeWithSignature("burn(uint256)", 1));
        assertFalse(ok, "burn(uint256) should not exist");
    }
}
