import { Template } from 'meteor/templating';
import {Urunler} from '../../collections/Urunler'

import './urunListe.html';

Template.urunListe.helpers({
    urunler(){
        let sira = 1;
        return Urunler.find({}).map((urun) =>{
            urun.id = sira++;
            return urun
        });
    }
});

