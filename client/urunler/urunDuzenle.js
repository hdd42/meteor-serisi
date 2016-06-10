import {Template} from 'meteor/templating';
import {Urunler} from '../../collections/Urunler'
import {Session} from 'meteor/session'

import './urunDuzenle.html';

Template.urunDuzenle.helpers({
    islem(){
        return Session.get('islem') || "Ürün Ekle"
    },
    islemYazi(){
        return Session.get('islem') == "Ürün Düzenle" ? "Kaydet" : "Ekle"
    },
    seciliUrun(field){
        let seciliUrun = Session.get('seciliUrun') || {}
        return seciliUrun ? seciliUrun[field] : ""
    }
})


Template.urunDuzenle.events({
    'submit #duzenleForm'(event){
        event.preventDefault();

        const urun = event.target;
        const yeniUrun = {
            public:urun.public.checked ,
            urun: urun.urunIsmi.value,
            fiyat:parseInt(urun.urunFiyat.value),
            stok: parseInt(urun.urunStok.value)
        }
        console.log(yeniUrun)
        const islem = Session.get('islem')
        if (islem == 'Ürün Düzenle') {
            const seciliUrun = Session.get('seciliUrun')
            //Urunler.update(seciliUrun._id, yeniUrun)
            Meteor.call('urunler.guncelle',seciliUrun._id, yeniUrun);
            Session.set('islem', "Ürün Ekle")
        }
        else {
           // Urunler.insert(yeniUrun); //
            yeniUrun.ekleyenId = Meteor.userId()
            yeniUrun.kullaniciAdi= Meteor.user().emails[0].address;
            Meteor.call('urunler.ekle', yeniUrun);
        }

        urun.urunIsmi.value = "";
        urun.urunFiyat.value = "";
        urun.urunStok.value = "";
    }
})