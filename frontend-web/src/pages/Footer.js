import React from 'react'
import './layoutcss/Footer.css'
const Footer = () => {
  return (
    
<footer class="container-fluid bg-white text-dark ">
<div class="top-footer">   
<div class="container">
      <div class="row">
         
         <div class="col-xs-12 col-sm-12 col-md-8">
            <div class="area_newsletter">
               <div class="title_newsletter">
                  Đăng kí nhận tin
               </div>
               <div class="form_newsletter1"> 
                  <form class="contact-form1" >
                  <div class="input-group1">		
                     <input type="email"  placeholder="Nhập email của bạn"  aria-label="Email Address"/>
                     <button type="submit" class="button button1 dark">Đăng kí</button>
                  </div>
                  </form>
               </div>
            </div>
         </div>
         <div  class="col-xs-12 col-sm-12 col-md-4">
            <div class="area_phone_contact">
               <p  class="number_phone">
                  <i class="fa fa-phone "></i>
                  <span>Hỗ trợ / Mua hàng:</span>
                  <a href="tel:909090909">
                     909090909
                  </a>
               </p>
            </div>
         </div>
         
      </div>
   </div>
</div>

  <div class="container mt-4">
     <div class="row">
        <div class="col-md-6">
           <div class="row">
              <div class="col-md-6 ">
                 <div class="logo-part">THÔNG TIN SHOP
                   
                    <p class="mt-3">01, Võ văn ngân ,linh chiểu, thành phố Thủ Đức.</p>
                    <p>shopquanaotien@gmail.com</p>
                    <p>liên hệ: 0816002727</p>
                 </div>
              </div>
              <div class="col-md-6 px-4">
                 <h6>LIÊN HỆ VỚI SHOP</h6>
                 <p>Facebook</p>
                 <p>Zalo</p>
                 <p>TikTok.com</p>
              </div>
           </div>
        </div>
        <div class="col-md-6">
           <div class="row">
              <div class="col-md-6 px-7">
                 <h6>LIÊN KẾT</h6>
                 <div class="row ">
                    <div class="col-md-7">
                     <p>Tìm kiếm</p>
                     <p>Giới thiệu</p>
                     <p>Chính sách đổi trả</p>
                    </div>
                    
                 </div>
              </div>
              <div class="col-md-6 ">
                 <h6> GIỚI THIỆU</h6>
                 <form class="form-footer my-3">
                 </form>
                 <p>Chuyên cung cấp sỉ,lẻ quần áo thời trang giá tốt nhất </p>
                 <p>Thời trang nam nữ </p>
              </div>
           </div>
        </div>
     </div>
     
   </div>
  </footer>
  )
}

export default Footer
