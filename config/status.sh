#!/usr/bin/env bash

# This bash script is used to login to the antminer, determine hash rate, check if its below a threshold.
# If it is then reboot the miner, email the hashrate and the event.
# Wait 90 seconds (per the antminer docs), email out an uptime to verify that its resumed.
# Using sshpass since my version of antminer wipes all ssh keys upon reboot
# Replace passwords, IP's and email address as needed

# Get the current hash rate
cgminer `echo '{"command":"stats"}' | nc 192.168.7.101 4028 >> output.txt`

hash_rate=$("grep '\[GHS av\]' output.txt | cut -b 16-20")
epoch=$(date +%s)
echo "Hashrate is $hash_rate