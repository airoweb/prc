#!/usr/bin/env bash

# This bash script is used to login to the antminer, determine hash rate, check if its below a threshold.
# If it is then reboot the miner, email the hashrate and the event.
# Wait 90 seconds (per the antminer docs), email out an uptime to verify that its resumed.
# Using sshpass since my version of antminer wipes all ssh keys upon reboot
# Replace passwords, IP's and email address as needed

# Get the current hash rate
`echo '{"command":"stats"}' | nc 192.168.7.101 4028 >> output.txt` |

hash_rate=$(awk -v tag='GHS 5s' 'match($0,"\""tag"\": *(\"[^\"]*|[0-9]+)") { val=substr($0,RSTART,RLENGTH); sub(/^"[^"]+": *"?/,"",val); print val }' output.txt) |
epoch=$(date +%s) |
if [ "18000" -gt "$hash_rate" ];  then 
	echo "Hashrate is $hash_rate, rebooting..." | mail -s "Antminer Status - $epoch" behzadamirinezhad@gmail.com;
	"/etc/init.d/cgminer reload"
    echo "Need reload"
fi