import React from "react";

// materialize navbar
const Footer = () =>

    <footer class="page-footer footer-fixed grey center-on-small-only">
        <div class="footer-copyright">
            <div class="container">
                <div>
                    &copy;
                    <span id="copyright"> <script>document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()))</script></span>
                    <span><a class="grey-text text-lighten-4">chedah</a>. All rights reserved.</span>
                </div>
            </div>
        </div>
    </footer>

export default Footer;
