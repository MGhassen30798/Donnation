const Company = require('../Models/companyModels').Company;
const user = require('../Models/userModel').user;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const jwt = require('jsonwebtoken');
const { error } = require('npmlog');
const Token = require('../Models/Token');
require("dotenv").config();
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const multer = require('../middleware/multer-config');
const cloudinary = require('../middleware/cloudinary');




//get Company by id
exports.getCompanybyid = (req, res, next) => {
    Company.findOne({ _id: req.params.id })
        .then(Company => res.status(200).json(Company))
        .catch(error => res.status(404).json({ message: "Company not found Check id " }));
}

//get all Company
exports.getAllCompany = (req, res, next) => {
    Company.find()
        .then(Company => res.status(200).json({ companys: Company }))
        .catch(error => res.status(400).json({ error }));
}

//update Company
exports.updateCompany = async(req, res, next) => {
    await Company.updateOne({ _id: req.params.id }, {...req.body,
            _id: req.params.id
        })
        .then(() => res.status(201).json({ message: 'Company modified !' }))
        .catch(error => res.status(400).json({ message: "Check id" }));
}

//delete Company
exports.deleteCompany = (req, res, next) => {
    Company.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Company deleted !' }))
        .catch(error => res.status(400).json({ message: "Check id" }));
}



//sign up
exports.signupCompany = async(req, res) => {

    await Company.init();
    const hashedPass = await bcrypt.hash(req.body.passwordCompany, 10)
    const photoCloudinary = await cloudinary.uploader.upload(req.file.path)
    const company = new Company({
        emailCompany: req.body.emailCompany,
        phoneNumberCompany: req.body.phoneNumberCompany,
        lastNameCompany: req.body.lastNameCompany,
        firstNameCompany: req.body.firstNameCompany,
        brandPicCompany: photoCloudinary.url,
        businessNameCompany: req.body.businessNameCompany,
        verifiedCompany: req.body.verifiedCompany,
        passwordCompany: hashedPass
    })

    await company.save()
        .then(() => {




            res.status(201).json({ message: 'Created compagny !' })



        })
        .catch(error => res.status(400).json({ error }));


};



//login

exports.login = (req, res, next) => {

    console.log(req.body);
    Company.findOne({
            emailCompany: req.body.emailCompany,
        })
        .then(Company => {
            if (!Company) {

                return res.status(404).json({ error: 'wrong email ' });

            } else if (Company.verifiedCompany) {
                bcrypt.compare(req.body.passwordCompany, Company.passwordCompany)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ error: 'wrong password' });
                        }
                        res.status(200).json({
                            Company: Company,
                            token: jwt.sign({ CompanyId: Company._id },
                                'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                            )

                        });
                    })
                    .catch(error => res.status(500).json({ error }));
            } else {
                return res.status(402).json({ error: 'Payment Required' });
            }
        })
        .catch(error => res.status(500).json({ error }));


};

function templateReset(val, name) {
    return `
    <!DOCTYPE html >
    <html>
    
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <!-- Facebook sharing information tags -->
      <meta property="og:title" content="Reset Your Password">
      <title>Reset Your password</title>
      <style type="text/css">
        #outlook a{
            padding:0;
          }
          body{
            width:100% !important;
          }
          .ReadMsgBody{
            width:100%;
          }
          .ExternalClass{
            width:100%;
          }
          body{
            -webkit-text-size-adjust:none;
          }
          body{
            margin:0;
            padding:0;
          }
          img{
            border:0;
            height:auto;
            line-height:100%;
            outline:none;
            text-decoration:none;
          }
          table td{
            border-collapse:collapse;
          }
          #backgroundTable{
            height:100% !important;
            margin:0;
            padding:0;
            width:100% !important;
          }
        /*
        @tab Page
        @section background color
        @tip Set the background color for your email. You may want to choose one that matches your company's branding.
        @theme page
        */
          body,#backgroundTable{
            /*@editable*/background-color:#FAFAFA;
          }
        /*
        @tab Page
        @section email border
        @tip Set the border for your email.
        */
          #templateContainer{
            /*@editable*/border:1px none #DDDDDD;
          }
        /*
        @tab Page
        @section heading 1
        @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
        @style heading 1
        */
          h1,.h1{
            /*@editable*/color:#202020;
            display:block;
            /*@editable*/font-family:Arial;
            /*@editable*/font-size:24px;
            /*@editable*/font-weight:bold;
            /*@editable*/line-height:100%;
            margin-top:20px;
            margin-right:0;
            margin-bottom:20px;
            margin-left:0;
            /*@editable*/text-align:center;
          }
        /*
        @tab Page
        @section heading 2
        @tip Set the styling for all second-level headings in your emails.
        @style heading 2
        */
          h2,.h2{
            /*@editable*/color:#202020;
            display:block;
            /*@editable*/font-family:Arial;
            /*@editable*/font-size:30px;
            /*@editable*/font-weight:bold;
            /*@editable*/line-height:100%;
            margin-top:0;
            margin-right:0;
            margin-bottom:10px;
            margin-left:0;
            /*@editable*/text-align:center;
          }
        /*
        @tab Page
        @section heading 3
        @tip Set the styling for all third-level headings in your emails.
        @style heading 3
        */
          h3,.h3{
            /*@editable*/color:#202020;
            display:block;
            /*@editable*/font-family:Arial;
            /*@editable*/font-size:26px;
            /*@editable*/font-weight:bold;
            /*@editable*/line-height:100%;
            margin-top:0;
            margin-right:0;
            margin-bottom:10px;
            margin-left:0;
            /*@editable*/text-align:center;
          }
        /*
        @tab Page
        @section heading 4
        @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
        @style heading 4
        */
          h4,.h4{
            /*@editable*/color:#202020;
            display:block;
            /*@editable*/font-family:Arial;
            /*@editable*/font-size:13px;
            /*@editable*/font-weight:bold;
            /*@editable*/line-height:100%;
            margin-top:0;
            margin-right:0;
            margin-bottom:10px;
            margin-left:0;
            /*@editable*/text-align:center;
          }
        /*
        @tab Header
        @section preheader style
        @tip Set the background color for your email's preheader area.
        @theme page
        */
          #templatePreheader{
            /*@editable*/background-color:#FAFAFA;
          }
        /*
        @tab Header
        @section preheader text
        @tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
        */
          .preheaderContent div{
            /*@editable*/color:#505050;
            /*@editable*/font-family:Arial;
            /*@editable*/font-size:10px;
            /*@editable*/line-height:100%;
            /*@editable*/text-align:left;
          }
        /*
        @tab Header
        @section preheader link
        @tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
        */
          .preheaderContent div a:link,.preheaderContent div a:visited,.preheaderContent div a .yshortcuts {
            /*@editable*/color:#336699;
            /*@editable*/font-weight:normal;
            /*@editable*/text-decoration:underline;
          }
          .preheaderContent img{
            display:inline;
            height:auto;
            margin-bottom:10px;
            max-width:280px;
          }
        /*
        @tab Header
        @section header style
        @tip Set the background color and border for your email's header area.
        @theme header
        */
          #templateHeader{
            /*@editable*/background-color:#FFFFFF;
            /*@editable*/border-bottom:0;
          }
        /*
        @tab Header
        @section header text
        @tip Set the styling for your email's header text. Choose a size and color that is easy to read.
        */
          .headerContent{
            /*@editable*/color:#202020;
            /*@editable*/font-family:Arial;
            /*@editable*/font-size:34px;
            /*@editable*/font-weight:bold;
            /*@editable*/line-height:100%;
            /*@editable*/padding:0;
            /*@editable*/text-align:left;
            /*@editable*/vertical-align:middle;
            background-color: #FAFAFA;
              padding-bottom: 14px;
          }
        /*
        @tab Header
        @section header link
        @tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
        */
          .headerContent a:link,.headerContent a:visited,.headerContent a .yshortcuts {
            /*@editable*/color:#336699;
            /*@editable*/font-weight:normal;
            /*@editable*/text-decoration:underline;
          }
          #headerImage{
            height:auto;
            max-width:400px !important;
          }
        /*
        @tab Body
        @section body style
        @tip Set the background color for your email's body area.
        */
          #templateContainer,.bodyContent{
            /*@editable*/background-color:#FFFFFF;
          }
        /*
        @tab Body
        @section body text
        @tip Set the styling for your email's main content text. Choose a size and color that is easy to read.
        @theme main
        */
          .bodyContent div{
            /*@editable*/color:#505050;
            /*@editable*/font-family:Arial;
            /*@editable*/font-size:14px;
            /*@editable*/line-height:150%;
            /*@editable*/text-align:left;
          }
        /*
        @tab Body
        @section body link
        @tip Set the styling for your email's main content links. Choose a color that helps them stand out from your text.
        */
          .bodyContent div a:link,.bodyContent div a:visited,.bodyContent div a .yshortcuts {
            /*@editable*/color:#336699;
            /*@editable*/font-weight:normal;
            /*@editable*/text-decoration:underline;
          }
          .bodyContent img{
            display:inline;
            height:auto;
            margin-bottom:10px;
            max-width:280px;
          }
        /*
        @tab Footer
        @section footer style
        @tip Set the background color and top border for your email's footer area.
        @theme footer
        */
          #templateFooter{
            /*@editable*/background-color:#FFFFFF;
            /*@editable*/border-top:0;
          }
        /*
        @tab Footer
        @section footer text
        @tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
        @theme footer
        */
          .footerContent {
            background-color: #fafafa;
          }
          .footerContent div{
            /*@editable*/color:#707070;
            /*@editable*/font-family:Arial;
            /*@editable*/font-size:11px;
            /*@editable*/line-height:150%;
            /*@editable*/text-align:left;
          }
        /*
        @tab Footer
        @section footer link
        @tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
        */
          .footerContent div a:link,.footerContent div a:visited,.footerContent div a .yshortcuts {
            /*@editable*/color:#336699;
            /*@editable*/font-weight:normal;
            /*@editable*/text-decoration:underline;
          }
          .footerContent img{
            display:inline;
          }
        /*
        @tab Footer
        @section social bar style
        @tip Set the background color and border for your email's footer social bar.
        @theme footer
        */
          #social{
            /*@editable*/background-color:#FAFAFA;
            /*@editable*/border:0;
          }
        /*
        @tab Footer
        @section social bar style
        @tip Set the background color and border for your email's footer social bar.
        */
          #social div{
            /*@editable*/text-align:left;
          }
        /*
        @tab Footer
        @section utility bar style
        @tip Set the background color and border for your email's footer utility bar.
        @theme footer
        */
          #utility{
            /*@editable*/background-color:#FFFFFF;
            /*@editable*/border:0;
          }
        /*
        @tab Footer
        @section utility bar style
        @tip Set the background color and border for your email's footer utility bar.
        */
          #utility div{
            /*@editable*/text-align:left;
          }
          #monkeyRewards img{
            display:inline;
            height:auto;
            max-width:280px;
          }
      
      
        /*
        ATAVIST CUSTOM STYLES 
         */
      
        .buttonText {
          color: #4A90E2;
          text-decoration: none;
          font-weight: normal;
          display: block;
          border: 2px solid #585858;
          padding: 10px 80px;
          font-family: Arial;
        }
      
        #supportSection, .supportContent {
          background-color: white;
          font-family: arial;
          font-size: 12px;
          border-top: 1px solid #e4e4e4;
        }
      
        .bodyContent table {
          padding-bottom: 10px;
        }
      
      
        .footerContent p {
          margin: 0;
          margin-top: 2px;
        }
      
        .headerContent.centeredWithBackground {
          background-color: #F4EEE2;
          text-align: center;
          padding-top: 20px;
          padding-bottom: 20px;
        }
            
         @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
                h1 {
                    font-size: 40px !important;
                }
                
                .content {
                    font-size: 22px !important;
                }
                
                .bodyContent p {
                    font-size: 22px !important;
                }
                
                .buttonText {
                    font-size: 22px !important;
                }
                
                p {
                    
                    font-size: 16px !important;
                    
                }
                
                .footerContent p {
                    padding-left: 5px !important;
                }
                
                .mainContainer {
                    padding-bottom: 0 !important;   
                }
            }
      </style>
    </head>
    
    <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="width:100% ;-webkit-text-size-adjust:none;margin:0;padding:0;background-color:#FAFAFA;">
      <center>
        <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="backgroundTable" style="height:100% ;margin:0;padding:0;width:100% ;background-color:#FAFAFA;">
          <tr>
            <td align="center" valign="top" style="border-collapse:collapse;">
              <!-- // Begin Template Preheader \\ -->
              <table border="0" cellpadding="10" cellspacing="0" width="450" id="templatePreheader" style="background-color:#FAFAFA;">
                <tr>
                  <td valign="top" class="preheaderContent" style="border-collapse:collapse;">
                    <!-- // Begin Module: Standard Preheader \\ -->
                    <table border="0" cellpadding="10" cellspacing="0" width="100%">
                      <tr>
                        <td valign="top" style="border-collapse:collapse;">
                          <!-- <div mc:edit="std_preheader_content">
                                                         Use this area to offer a short teaser of your email's content. Text here will show in the preview area of some email clients.
                                                      </div>
                                                      -->
                        </td>
                      </tr>
                    </table>
                    <!-- // End Module: Standard Preheader \\ -->
                  </td>
                </tr>
              </table>
                    <!-- // Begin Template Header \\ -->
                    <table border="0" cellpadding="0" cellspacing="0" width="450" id="templateHeader" style="background-color:#FFFFFF;border-bottom:0;">
                      <tr>
              <!-- // End Template Preheader \\ -->
              <table border="0" cellpadding="0" cellspacing="0" width="450" id="templateContainer" style="border:1px none #DDDDDD;background-color:#FFFFFF;">
                <tr>
                  <td align="center" valign="top" style="border-collapse:collapse;">
                        <td class="headerContent centeredWithBackground" style="border-collapse:collapse;color:#202020;font-family:Arial;font-size:34px;font-weight:bold;line-height:100%;padding:0;text-align:center;vertical-align:middle;background-color:#F4EEE8;padding-bottom:20px;padding-top:20px;">
                          <!-- // Begin Module: Standard Header Image \\ -->
                          <img width="130" src="cid:logo.ee" id="headerImage campaign-icon">
                          <!-- // End Module: Standard Header Image \\ -->
                       
                        
                      </tr>
                    </table>
                    <!-- // End Template Header \\ -->
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="top" style="border-collapse:collapse;">
                    <!-- // Begin Template Body \\ -->
                    <table border="1" cellpadding="0" cellspacing="0" width="450" id="templateBody">
                      <tr>
                        <td valign="top" class="bodyContent" style="border-collapse:collapse;background-color:#F3F4ED;">
                          <!-- // Begin Module: Standard Content \\ -->
                          <table border="0" cellpadding="12" cellspacing="0" width="100%" style="padding-bottom:10px;">
                            <tr>
                              <td valign="top" style="padding-bottom:1rem;border-collapse:collapse;" class="mainContainer">
    
                                <div style="text-align:center;color:#FF96AD;font-family:Arial;font-size:14px;line-height:150%;">
                                <br>
                                  <br>
                                  <h1 class="h1" style="color:#114E60;display:block;font-family:Arial;font-size:24px;font-weight:bold;line-height:100%;margin-top:20px;margin-right:0;margin-bottom:20px;margin-left:0;text-align:left;">Hello</h1> <h1 class="h1" style="color:#114E60;display:block;font-family:Arial;font-size:24px;font-weight:bold;line-height:100%;margin-top:20px;margin-right:0;margin-bottom:20px;margin-left:0;text-align:left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${name}</h1>
                                 
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="border-collapse:collapse;">
                                <table border="0" cellpadding="0" cellspacing="0" style="padding-bottom:10px;">
                                  <tbody>
                                    <tr align="center">
                                      <td align="left" valign="middle" style="border-collapse:collapse;">
                                        <p class="buttonText" href="#" target="_blank" style="color: #325288;text-decoration: none;font-weight: normal;display: all ;border: 0px solid #022E57;padding: 10px 60px;font-size:17px;font-family: TimeNewroman;">${val}</p>
                                        <p class="h1" style="color:#114E60;font-family:TimeNewroman;font-size:20px;font-weight:bold;text-align:right;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thank you!</>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <!-- // End Module: Standard Content \\ -->
                        </td>
                      </tr>
                    </table>
                    <!-- // End Template Body \\ -->
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="top" style="border-collapse:collapse;">
                    <!-- // Begin Support Section \\ -->
                    <table border="0" cellpadding="10" cellspacing="0" width="450" id="supportSection"  style="background-color:black;font-family:arial;font-size:12px;border-top:1px solid #e4e4e4;">
                      <tr>
                        <td valign="top" class="supportContent" style="border-collapse:collapse;background-color:#F4EEE8;font-family:arial;font-size:12px;border-top:1px solid #e4e4e4;">
                          <!-- // Begin Module: Standard Footer \\ -->
                          <table border="0" cellpadding="10" cellspacing="0" width="100%">
                            <tr>
                              <td valign="top" width="100%" style="border-collapse:collapse;">
                                <br>
                                <div style="text-align: center; color: #02475E;">
                                  <p>Questions? Get your answers here:&nbsp;
                                  showapp.application@gmail.com.</p>
                                </div>
                                <br>
                              </td>
                            </tr>
                          </table>
                          <!-- // End Module: Standard Footer \\ -->
                        </td>
                      </tr>
                    </table>
                    <!-- // Begin Support Section \\ -->
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="top" style="border-collapse:collapse;">
                    <!-- // Begin Template Footer \\ -->
                    <table border="0" cellpadding="10" cellspacing="0" width="450" id="templateFooter" style="background-color:#FFFFFF;border-top:0;">
                      <tr>
                        <td valign="top" class="footerContent" style="padding-left:0;border-collapse:collapse;background-color:#fafafa;">
                          <div style="text-align:center;color:#02475E;font-family:Arial;font-size:11px;line-height:150%;">
                            <p style="text-align:right;margin:0;margin-top:2px;">showapp                      | Copyright © 2021 | All rights reserved</p>
                          </div>
                          <!-- // End Module: Standard Footer \\ -->
                        </td>
                      </tr>
                    </table>
                    <!-- // End Template Footer \\ -->
                  </td>
                </tr>
              </table>
              <br>
            </td>
          </tr>
        </table>
      </center>
    </body>
    
    </html>
`
}