import React from "react";
import "./global.css";
interface ProductAvailableProps {
  // children: any;
}

const ContactCards: StorefrontFunctionComponent<ProductAvailableProps> = () => {
  return (
    <>
      <div className="contact-channel">
        <img src="/arquivos/wppContact.png" alt="" />
        <h4 className="title-channel">WhatsApp</h4>
        <a  className="link-channel"  href="https://api.whatsapp.com/send/?phone=5511964737665&text=Ol%C3%A1%2C+eu+tenho+interesse+nos+produtos+da+Loja+Virtual+da+Care+Plus.+Poderia+me+ajudar%3F&app_absent=0" target="_blank">Fale com a gente</a>
      </div>

      <div className="contact-channel">
        <img src="/arquivos/chatContact.png" alt="" />
        <h4 className="title-channel">Chat</h4>
        <a className="link-channel" href="https://xwc.careplus.com.br/careplus/form_chat_storecareplus.html" target="_blank">Entre em contato</a>
      </div>
    </>
  );
};

export default ContactCards;
