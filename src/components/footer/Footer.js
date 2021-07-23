import React,{useState,useEffect} from 'react'
import { Envelope} from 'react-bootstrap-icons'
import'./Footer.css'
function Footer() {
    return(
        <> 
        
          <footer id="dk-footer" class="dk-footer">
              <div class="container">
                  <div class="copyright" >
                      <div class="row">
                          <div class="col-md-6">
                             &copy; {new Date().getFullYear()} Copyright:{" "}
                            <a>DevSociety - UMSS</a>
                          </div>
                          <div class="col-md-6" align="right">
                          <p> <i class="fas fa-envelope fa-lg white-text mr-md-2 mr-2 fa-1x"></i>
                            devsociety001@gmail.com </p>
                          </div>
                      </div>
                  </div>
              </div>
          </footer>
        </>
    );
}
export default Footer;