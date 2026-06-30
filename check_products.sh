#!/bin/bash
set -e
rm -f ./back.json ./front.json ./create.json ./front2.json
printf 'BACKEND direct status: '
http_status=$(curl -s -o ./back.json -w '%{http_code}' http://localhost:3000/api/products)
printf '%s\n' "$http_status"
python - <<'PY'
import json
with open('back.json') as f:
    data=json.load(f)
print('BACKEND direct success:', data.get('success'), 'count=', len(data.get('data', [])))
PY
printf '\nFRONTEND proxy status: '
http_status=$(curl -s -o ./front.json -w '%{http_code}' http://localhost:5173/api/products)
printf '%s\n' "$http_status"
python - <<'PY'
import json
with open('front.json') as f:
    data=json.load(f)
print('FRONTEND proxy success:', data.get('success'), 'count=', len(data.get('data', [])))
PY
printf '\nCREATE product status: '
http_status=$(curl -s -o ./create.json -w '%{http_code}' -X POST http://localhost:3000/api/products -H 'Content-Type: application/json' -d '{"name":"Test Local Product","price":111,"image":"https://via.placeholder.com/200?text=LocalTest","rating":4.1,"category":"tools","description":"Local test product"}')
printf '%s\n' "$http_status"
python - <<'PY'
import json
with open('create.json') as f:
    data=json.load(f)
print('CREATE response success:', data.get('success'), 'name=', data.get('data', {}).get('name'))
PY
printf '\nBACKEND direct find test product:'
python - <<'PY'
import json
with open('back.json') as f:
    data=json.load(f)
print('present before refresh:', any(item.get('name')=='Test Local Product' for item in data.get('data', [])))
PY
sleep 1
printf '\nFRONTEND proxy find test product:'
http_status=$(curl -s -o ./front2.json -w '%{http_code}' http://localhost:5173/api/products)
printf '%s\n' "$http_status"
python - <<'PY'
import json
with open('front2.json') as f:
    data=json.load(f)
print('present:', any(item.get('name')=='Test Local Product' for item in data.get('data', [])))
PY
