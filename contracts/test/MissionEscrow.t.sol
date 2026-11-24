// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {MissionEscrow} from "../src/MissionEscrow.sol";
import {AurenixToken} from "../src/AurenixToken.sol";

contract MissionEscrowTest is Test {
    MissionEscrow public escrow;
    AurenixToken public token;
    address public sponsor = makeAddr("sponsor");
    address public worker = makeAddr("worker");
    address public arbiter = makeAddr("arbiter");
    address public stranger = makeAddr("stranger");

    function setUp() public {
        escrow = new MissionEscrow();
        token = new AurenixToken();
        vm.deal(sponsor, 10 ether);
        // Fund sponsor with AUNX for ERC20 missions.
        token.transfer(sponsor, 10_000 * 10 ** 18);
    }

    // --- BNB missions ---

    function testFundBnbMission() public {
        vm.prank(sponsor);
        escrow.fundMissionBNB{value: 1 ether}(1, worker, arbiter);
        MissionEscrow.Mission memory m = escrow.getMission(1);
        assertEq(m.sponsor, sponsor);
        assertEq(m.worker, worker);
        assertEq(m.arbiter, arbiter);
        assertEq(m.token, address(0));
        assertEq(m.amount, 1 ether);
        assertEq(uint256(m.status), uint256(MissionEscrow.Status.Funded));
        assertEq(address(escrow).balance, 1 ether);
    }

    function testReleaseByArbiterPaysWorker() public {
        vm.prank(sponsor);
        escrow.fundMissionBNB{value: 1 ether}(1, worker, arbiter);
        uint256 before = worker.balance;
        vm.prank(arbiter);
        escrow.release(1);
        assertEq(worker.balance, before + 1 ether);
        assertEq(address(escrow).balance, 0);
        assertEq(uint256(escrow.getMission(1).status), uint256(MissionEscrow.Status.Released));
    }

    function testReleaseByOwnerAlsoWorks() public {
        vm.prank(sponsor);
        escrow.fundMissionBNB{value: 0.5 ether}(1, worker, arbiter);
        escrow.release(1); // test contract is the owner
        assertEq(worker.balance, 0.5 ether);
    }

    function testNonArbiterReleaseReverts() public {
        vm.prank(sponsor);
        escrow.fundMissionBNB{value: 1 ether}(1, worker, arbiter);
        vm.prank(stranger);
        vm.expectRevert(MissionEscrow.NotArbiter.selector);
        escrow.release(1);
        vm.prank(sponsor);
        vm.expectRevert(MissionEscrow.NotArbiter.selector);
        escrow.release(1);
        vm.prank(worker);
        vm.expectRevert(MissionEscrow.NotArbiter.selector);
        escrow.release(1);
    }

    function testDoubleReleaseReverts() public {
        vm.prank(sponsor);
        escrow.fundMissionBNB{value: 1 ether}(1, worker, arbiter);
        vm.prank(arbiter);
        escrow.release(1);
        vm.prank(arbiter);
        vm.expectRevert(MissionEscrow.MissionNotFunded.selector);
        escrow.release(1);
    }

    function testRefundToSponsorOnCancel() public {
        vm.prank(sponsor);
        escrow.fundMissionBNB{value: 1 ether}(1, worker, arbiter);
        uint256 before = sponsor.balance;
        vm.prank(sponsor);
        escrow.cancel(1);
        assertEq(sponsor.balance, before + 1 ether);
        assertEq(address(escrow).balance, 0);
        assertEq(uint256(escrow.getMission(1).status), uint256(MissionEscrow.Status.Refunded));
    }

    function testCancelOnlyBySponsor() public {
        vm.prank(sponsor);
        escrow.fundMissionBNB{value: 1 ether}(1, worker, arbiter);
        vm.prank(stranger);
        vm.expectRevert(MissionEscrow.NotSponsor.selector);
        escrow.cancel(1);
        vm.prank(worker);
        vm.expectRevert(MissionEscrow.NotSponsor.selector);
        escrow.cancel(1);
    }

    function testCancelAfterReleaseReverts() public {
        vm.prank(sponsor);
        escrow.fundMissionBNB{value: 1 ether}(1, worker, arbiter);
        vm.prank(arbiter);
        escrow.release(1);
        vm.prank(sponsor);
        vm.expectRevert(MissionEscrow.MissionNotFunded.selector);
        escrow.cancel(1);
    }

    function testDoubleCancelReverts() public {
        vm.prank(sponsor);
        escrow.fundMissionBNB{value: 1 ether}(1, worker, arbiter);
        vm.prank(sponsor);
        escrow.cancel(1);
        vm.prank(sponsor);
        vm.expectRevert(MissionEscrow.MissionNotFunded.selector);
        escrow.cancel(1);
    }

    function testDuplicateMissionIdReverts() public {
        vm.prank(sponsor);
        escrow.fundMissionBNB{value: 1 ether}(1, worker, arbiter);
        vm.prank(sponsor);
        vm.expectRevert(MissionEscrow.MissionAlreadyExists.selector);
        escrow.fundMissionBNB{value: 1 ether}(1, worker, arbiter);
    }

    function testReleaseUnknownMissionReverts() public {
        vm.prank(arbiter);
        vm.expectRevert(MissionEscrow.MissionNotFound.selector);
        escrow.release(999);
    }

    function testPauseBlocksFundingAndReleaseButNotRefund() public {
        vm.prank(sponsor);
        escrow.fundMissionBNB{value: 1 ether}(1, worker, arbiter);
        escrow.pause();
        vm.prank(sponsor);
        vm.expectRevert();
        escrow.fundMissionBNB{value: 1 ether}(2, worker, arbiter);
        vm.prank(arbiter);
        vm.expectRevert();
        escrow.release(1);
        // Sponsor can still get a refund while paused.
        vm.prank(sponsor);
        escrow.cancel(1);
        assertEq(sponsor.balance, 10 ether);
    }

    // --- ERC20 missions ---

    function testFundAndReleaseErc20Mission() public {
        vm.prank(sponsor);
        token.approve(address(escrow), 500 * 10 ** 18);
        vm.prank(sponsor);
        escrow.fundMissionToken(7, worker, arbiter, address(token), 500 * 10 ** 18);
        assertEq(token.balanceOf(address(escrow)), 500 * 10 ** 18);
        vm.prank(arbiter);
        escrow.release(7);
        assertEq(token.balanceOf(worker), 500 * 10 ** 18);
        assertEq(token.balanceOf(address(escrow)), 0);
    }

    function testRefundErc20Mission() public {
        vm.prank(sponsor);
        token.approve(address(escrow), 500 * 10 ** 18);
        vm.prank(sponsor);
        escrow.fundMissionToken(7, worker, arbiter, address(token), 500 * 10 ** 18);
        uint256 before = token.balanceOf(sponsor);
        vm.prank(sponsor);
        escrow.cancel(7);
        assertEq(token.balanceOf(sponsor), before + 500 * 10 ** 18);
    }
}
