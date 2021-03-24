$(function(){
    $.get("config.json", function(data){                
        $("#nombreItem").html(data.nombre);
        $("#puestoItem").html(data.puesto);
        $("#empresaItem").html(data.empresa);
        $("#resumenItem").html(data.resumen);
        $("#sitioWebItem").html(data.sitioWeb).prop("href", data.sitioWeb);
        $("#telefonoItem").html(data.telefono);
        $("#celularItem").html(data.celular).prop("href", "contacto.vcf");
        $("#emailItem").html(data.email).prop("href", "mailto:"+data.sitioWeb);
        $("#whatsAppItem").prop("href", "https://api.whatsapp.com/send?phone=52"+data.celular);
        $("#direccionItem").html(data.direccion);
        $("#mapsItem").html(data.mapsFrame);

        $("#shareFacebookItem").prop("href", data.compartir.facebook);        
        $("#shareMailItem").prop("href", data.compartir.mail);
        $("#shareTwitterItem").prop("href", data.compartir.twitter);
        $("#sharePinterestItem").prop("href", data.compartir.pinterest);
        $("#shareLinkedinItem").prop("href", data.compartir.linkedin);
        $("#shareWhatsAppitem").prop("href", data.compartir.whatsApp);

        // social links
        var socialLinks ="";
        if(data.socialNetwork.facebook !== ""){
            socialLinks +='<a target="_blank" id="shareFacebookItem" href="'+data.socialNetwork.facebook+'">';
            socialLinks +='  <img src="images/facebook.png" style="width: 43px;" alt=""/>';
            socialLinks +='</a>&nbsp;&nbsp;';    
        }        
        if(data.socialNetwork.twitter !== ""){
            socialLinks +='<a target="_blank" id="shareFacebookItem" href="'+data.socialNetwork.twitter+'">';
            socialLinks +='  <img src="images/twitter.png" style="width: 43px;" alt=""/>';
            socialLinks +='</a>&nbsp;&nbsp;';    
        }
        if(data.socialNetwork.linkedin !== ""){
            socialLinks +='<a target="_blank" id="shareFacebookItem" href="'+data.socialNetwork.linkedin+'">';
            socialLinks +='  <img src="images/linkedin.png" style="width: 43px;" alt=""/>';
            socialLinks +='</a>&nbsp;&nbsp;';    
        }
        
        $("#socialLinks").html(socialLinks);
        
        
        
        

        
        
        
    });
});
    
        
    