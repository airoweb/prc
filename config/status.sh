#!/usr/bin/env bash

rm output.txt |
`echo '{"command":"stats"}' | nc 127.0.0.1 4028 >> output.txt` |

hash_rate=$(awk -v tag='GHS av' 'match($0,"\""tag"\": *(\"[^\"]*|[0-9]+)") { val=substr($0,RSTART,RLENGTH); sub(/^"[^"]+": *"?/,"",val); print val }' output.txt) |
epoch=$(date +%s) |
if [ 9000 > hash_rate ];  then 
	/etc/init.d/cgminer reload
fi