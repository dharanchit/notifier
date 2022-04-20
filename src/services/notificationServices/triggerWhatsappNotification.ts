const triggerWhatsappNotification = (message:string) => {
    try {
        console.log('Triggered whatsapp notification');
        return 'Triggered whatsapp notification';
    } catch(err: any){
        console.error(err);
        return '';
    }
}

export default triggerWhatsappNotification;