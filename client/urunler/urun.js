import {Template} from 'meteor/templating';
import {Urunler} from '../../collections/Urunler'
import {Session} from 'meteor/session'

import './urun.html';

Template.urun.events({
    'click #duzenle'(event){
        const urun = this;
        Session.set('islem', 'Ürün Düzenle')
        Session.set('seciliUrun', urun)
    },
    'click #sil'(event){
       const urun = this;
       // Urunler.remove(urun._id)
        Meteor.call('urunler.sil', urun._id);
    },
    'click #stokdisi'(event){
        const urun = this;
        Meteor.call('urunler.stokdisi', urun._id);
    }

})