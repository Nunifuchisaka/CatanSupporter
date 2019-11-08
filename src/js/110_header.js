;(function($, window, document, undefined){
'use strict';

window.CATAN = window.CATAN || {};


CATAN.DiceModel = Backbone.Model.extend({
  defaults: function(){
    number: null
  }
});

CATAN.Dice = Backbone.View.extend({
  initialize: function(){
    _.bindAll(this, "roll", "render");
    this.model = new CATAN.DiceModel();
    this.model.on("change", this.render);
    this.render();
  },
  roll: function(){
    var random = Math.floor(Math.random() * 6) + 1;
    this.model.set("number", random);
  },
  render: function(){
    var number = this.model.get("number");
    this.$el.html("サイコロ：" + number);
  }
});


$(function(){
  
  
  CATAN.$el = {
    diceRoll: $("#diceRoll"),
    diceResult: $("#diceResult")
  };
  
  CATAN.dice1 = new CATAN.Dice({
    el: "#dice1"
  });
  CATAN.dice2 = new CATAN.Dice({
    el: "#dice2"
  });
  
  CATAN.$el.diceRoll.click(function(){
    CATAN.dice1.roll();
    CATAN.dice2.roll();
    
    CATAN.$el.diceResult.html(
      CATAN.dice1.model.get("number") + CATAN.dice2.model.get("number")
    );
  });
  //console.log();
  
});
