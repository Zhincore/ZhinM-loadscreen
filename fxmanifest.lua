fx_version "cerulean"
game "gta5"

author "Zhincore <adam@zhincore.eu>"
description "Custom loading screen"
version "1.0.0"

client_script "dist/client.js"
server_script "dist/server.js"

files {"dist/index.html", "placeholder.html", "config.yml"}

ui_page "placeholder.html"
loadscreen "dist/index.html"
loadscreen_manual_shutdown "yes"

fxdk_watch_command 'yarn' {'watch'}
fxdk_build_command 'yarn' {'build'}
