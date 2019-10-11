#!/usr/bin/env bash

# This bash script is used to login to the antminer, determine hash rate, check if its below a threshold.
# If it is then reboot the miner, email the hashrate and the event.
# Wait 90 seconds (per the antminer docs), email out an uptime to verify that its resumed.
# Using sshpass since my version of antminer wipes all ssh keys upon reboot
# Replace passwords, IP's and email address as needed

# Get the current hash rate
hash_rate=$(sshpass -p "Hamid1010" ssh -o StrictHostKeyChecking=no root@192.168.7.101 "cgminer-api | grep '\[GHS av\]' | cut -b 16-20")
epoch=$(date +%s)

# Notify me and reboot if its low
if [ 18000 -gt "$hash_rate" ];  then
	echo "Hashrate is $hash_rate, rebooting..." | mail -s "Miner Status - $epoch" behzadamirinezhad@gmail.com;
	sshpass -p "Hamid1010" ssh -o StrictHostKeyChecking=no root@192.168.7.101 "/sbin/reboot"

	# A ghetto health check
	sleep 90

	uptime=$(sshpass -p "Hamid1010" ssh -o StrictHostKeyChecking=no root@192.168.7.101 "uptime")
	echo "Current uptime is: $uptime." | mail -s "Miner Status - $epoch" behzadamirinezhad@gmail.com;
fi