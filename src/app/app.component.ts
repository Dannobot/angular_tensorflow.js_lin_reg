import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chart } from 'chart.js';
import * as tf from '@tensorflow/tfjs';
import { NgForm } from "@angular/forms";
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jsnn';

  Model: tf.Sequential;
  prediction: any;
  constructor() {

  }
  // a = tf.tensor(0.1).variable();
  // b = tf.tensor(0.1).variable();
  // c = tf.tensor(0.1).variable();
  ngOnInit(){
    // this.trainNewModel();

  }
  


  xs = [];
  ys = [];
  chart = [];
  bs = [];
  // cd = [11,23,31,24,53,6,17,38,29,11,5,23,19];
  // vf = [1,2,3,4,5,6,7,8,9,10,11,12,13];
  
  async onClik(val){
    // const source = timer(1000);
    this.Model = tf.sequential();
    this.Model.add(tf.layers.leakyReLU({inputShape:[1]}));
    this.Model.add(tf.layers.leakyReLU({inputShape:[128]}));
    this.Model.add(tf.layers.dense({units:1, inputShape:[128]}));
    this.Model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
    // var cd = [3,2,1,4,5,3,9,8,10,16,17,15,25];
    // var vf = [1,1,1,2,2,2,3,3,3,4,4,4,5,5];
    const x = val.x;
    const y = val.y;

    this.xs.push(x);
    this.ys.push(y);
    console.log('xs:', this.xs);
    console.log('ys:', this.ys);
    // console.log('model trained!');
    await this.Model.fit(tf.tensor(this.xs), tf.tensor(this.ys)).then(()=>{

      var bestfit = this.Model.predict(tf.tensor(this.xs, [this.xs.length,1])) as any;
      this.prediction = Array.from(bestfit.dataSync())[0]
      this.bs.push(this.prediction);
      console.log(bestfit.dataSync());
      this.chart = new Chart('myChart', {
        type: 'line',
        data: {
                labels: this.xs,
                datasets: [
                {
                    label: 'Original Data',
                    data: this.ys,
                    borderWidth: 1,
                },{
                  label: 'Best Fit line',
                  data: bestfit.dataSync(),
                  borderWidth: 1,
                  borderColor: '#FF0000',
                  backgroundColor: 'rgba(1,1,1,0)'
              },]
              },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
  
    
      console.log('model trained!');
    });
    // const subscribe = source.subscribe(val => console.log(val));

  }

  async onBuild(){


  }


  // async trainNewModel() {
  //   this.linearModel = tf.sequential();
  //   this.linearModel.add(tf.layers.dense({units:1, inputShape: [1]}));
  //   this.linearModel.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

  //   const xs = tf.tensor1d([3.2, 4.4, 5.5, 6.83, 4.668, 8.9, 7.91, 5.7, 8.7, 3.1, 2.1]);
  //   const ys = tf.tensor1d([1.6, 2.7, 3.5, 1.84, 2.273, 3.2, 2.831, 2.92, 3.24, 1.35, 1.03]); 

  //   await this.linearModel.fit(xs, ys);

  //   console.log('model trained!');
  // }
  
  // lineralPred(val){
  //   val = Number(val);
  //   const output = this.linearModel.predict(tf.tensor2d([val], [1,1])) as any;
  //   this.prediction = Array.from(output.dataSync())[0]
  // }


}
