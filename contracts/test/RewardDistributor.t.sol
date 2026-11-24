// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {RewardDistributor} from "../src/RewardDistributor.sol";
import {AurenixToken} from "../src/AurenixToken.sol";

contract RewardDistributorTest is Test {
    RewardDistributor public distributor;
    AurenixToken public token;
    address public worker = makeAddr("worker");
    address public stranger = makeAddr("stranger");

    function setUp() public {
        token = new AurenixToken();
        distributor = new RewardDistributor(address(token));
        // Fund the distributor with 10,000 AUNX.
        token.transfer(address(distributor), 10_000 * 10 ** 18);
    }

    function testApproveAndClaim() public {
        distributor.approveClaim(1, worker, 100 * 10 ** 18);
        vm.prank(worker);
        distributor.claim(1);
        assertEq(token.balanceOf(worker), 100 * 10 ** 18);
        assertEq(distributor.availableRewards(), 9_900 * 10 ** 18);
        (address w, uint256 amt, bool approved, bool claimed) = distributor.claims(1);
        assertEq(w, worker);
        assertEq(amt, 100 * 10 ** 18);
        assertTrue(approved);
        assertTrue(claimed);
    }

    function testDoubleClaimReverts() public {
        distributor.approveClaim(1, worker, 100 * 10 ** 18);
        vm.prank(worker);
        distributor.claim(1);
        vm.prank(worker);
        vm.expectRevert(RewardDistributor.ClaimAlreadyPaid.selector);
        distributor.claim(1);
    }

    function testUnapprovedClaimReverts() public {
        vm.prank(worker);
        vm.expectRevert(RewardDistributor.ClaimNotApproved.selector);
        distributor.claim(42);
    }

    function testOnlyDesignatedWorkerCanClaim() public {
        distributor.approveClaim(1, worker, 100 * 10 ** 18);
        vm.prank(stranger);
        vm.expectRevert(RewardDistributor.NotWorker.selector);
        distributor.claim(1);
    }

    function testInsufficientFundingReverts() public {
        distributor.approveClaim(1, worker, 20_000 * 10 ** 18); // more than the 10,000 funded
        vm.prank(worker);
        vm.expectRevert(
            abi.encodeWithSelector(
                RewardDistributor.InsufficientFunding.selector, 10_000 * 10 ** 18, 20_000 * 10 ** 18
            )
        );
        distributor.claim(1);
    }

    function testDuplicateApprovalReverts() public {
        distributor.approveClaim(1, worker, 100 * 10 ** 18);
        vm.expectRevert(RewardDistributor.ClaimAlreadyApproved.selector);
        distributor.approveClaim(1, worker, 200 * 10 ** 18);
    }

    function testApproveOnlyOwner() public {
        vm.prank(stranger);
        vm.expectRevert();
        distributor.approveClaim(1, worker, 100 * 10 ** 18);
    }

    function testDistributorNeverMints() public {
        // Total supply is unchanged after funding + claiming: the distributor
        // only moves AUNX it was given, it never creates any.
        uint256 supplyBefore = token.totalSupply();
        distributor.approveClaim(1, worker, 100 * 10 ** 18);
        vm.prank(worker);
        distributor.claim(1);
        assertEq(token.totalSupply(), supplyBefore);
        assertEq(token.totalSupply(), 100_000_000 * 10 ** 18);
    }

    function testPauseBlocksClaimAndApprove() public {
        distributor.approveClaim(1, worker, 100 * 10 ** 18);
        distributor.pause();
        vm.prank(worker);
        vm.expectRevert();
        distributor.claim(1);
        vm.expectRevert();
        distributor.approveClaim(2, worker, 50 * 10 ** 18);
        distributor.unpause();
        vm.prank(worker);
        distributor.claim(1);
        assertEq(token.balanceOf(worker), 100 * 10 ** 18);
    }
}
