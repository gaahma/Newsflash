class ReaderModel {
  constructor(setFlash){
    this.setFlash = setFlash;
    console.log(this.setFlash);
    setTimeout(this.flash, 2000);
  }

  flash(){
    this.setFlash("hello");
  }



}





export default ReaderModel;