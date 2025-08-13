#!/usr/bin/env python3
import http.server
import socketserver
import json
import os
from urllib.parse import urlparse

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/emailjs-config':
            # Serve EmailJS configuration from environment variables
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            config = {
                'publicKey': os.environ.get('EMAILJS_PUBLIC_KEY', ''),
                'serviceId': os.environ.get('EMAILJS_SERVICE_ID', ''),
                'templateId': os.environ.get('EMAILJS_TEMPLATE_ID', '')
            }
            
            self.wfile.write(json.dumps(config).encode())
        else:
            # Serve static files normally
            super().do_GET()

if __name__ == "__main__":
    PORT = 5000
    
    with socketserver.TCPServer(("0.0.0.0", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Serving at http://0.0.0.0:{PORT}")
        httpd.serve_forever()