TerraBridge Agri Solutions - website files
==========================================

This is a plain static website (HTML + CSS + JavaScript + images).
There is NO back end, database, CMS or server code. Nothing to install or build.

HOW TO PUBLISH ON GODADDY
1. In GoDaddy hosting (cPanel > File Manager, or via FTP), open the public_html folder.
2. Upload everything in this folder, keeping the folder structure exactly:
     index.html, script.js, styles.css, updates.css, img/, assets/, docs/
3. index.html must sit directly in public_html (not inside a sub-folder).
4. Point the domain terrabridgeagri.com at the GoDaddy hosting. The domain is
   registered at Namecheap, so either change the nameservers at Namecheap to
   GoDaddy's, or set the A record at Namecheap to the GoDaddy hosting IP.
   Leave the existing MX (email) records alone so info@terrabridgeagri.com keeps working.
5. Turn on the free SSL certificate in GoDaddy so the site loads on https://.

NOTES
- The "farm package" quote builder runs in the browser and opens WhatsApp
  (wa.me/233535086004). No form handling or server is needed.
- Fonts load from Google Fonts (internet connection required, nothing to configure).
- Two video files were too large to include in this download and must be added
  by hand into the assets/ folder with these exact names:
     assets/exhibition-film.mp4   (about 15 MB)
     assets/ad-still-waiting.mp4  (about 6 MB)
  Soka can save them from the current website (Open video link) and send them over.
