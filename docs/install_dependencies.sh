#!/bin/sh

rm -rf ext
mkdir -p ext/js

# jQuery
curl -o ext/js/jquery.js http://code.jquery.com/jquery.min.js

# JSrender (JavaScript Template Rendering for jQuery)
curl -o ext/js/jsrender.js https://raw.github.com/BorisMoore/jsrender/master/jsrender.js

# JSO (JavaScript OAuth 2 client)
curl -o ext/js/jso.js https://raw.github.com/andreassolberg/jso/master/jso.js

# Bootstrap
cd ext/
curl -o bootstrap.zip http://twitter.github.com/bootstrap/assets/bootstrap.zip
unzip -o -q bootstrap.zip
rm bootstrap.zip
cd ../

# Bootstrap Modal
curl -o ext/js/bootstrap-modal.js http://twitter.github.com/bootstrap/assets/js/bootstrap-modal.js

# Bootstrap Tooltip
curl -o ext/js/bootstrap-tooltip.js http://twitter.github.com/bootstrap/assets/js/bootstrap-tooltip.js

# Bootstrap Popover
curl -o ext/js/bootstrap-popover.js http://twitter.github.com/bootstrap/assets/js/bootstrap-popover.js
