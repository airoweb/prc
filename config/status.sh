#!/usr/bin/env bash

rm output.txt |
`echo '{"command":"stats"}' | nc 192.168.7.101 4028 >> output.txt` |

hash_rate=$(awk -v tag='GHS av' 'match($0,"\""tag"\": *(\"[^\"]*|[0-9]+)") { val=substr($0,RSTART,RLENGTH); sub(/^"[^"]+": *"?/,"",val); print val }' output.txt) |
epoch=$(date +%s) |
if [ "18000" -gt "$hash_rate" ];  then 
	echo "Hashrate is $hash_rate, rebooting..." | mail -s "Device Status - $epoch" behzadamirinezhad@gmail.com;
	"/etc/init.d/cgminer reload"
fi