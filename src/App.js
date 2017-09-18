import React, { Component } from 'react';
import './App.css';
import Thumbnail from './Thumbnail';

const getData = () => ({
  room_type: 'living_room',
  room_photo: 'https://hutch-clean-photos.s3.amazonaws.com/render-b9d536c0-8430-433f-9280-2d0d970f14a1.jpeg',
  products: [
    {
      id: 110,
      index: 1,
      top: 58.1371,
      left: 20.914,
      width: 58.1189,
      height: 27.7761,
      type: 'sofa',
      url: 'https://d32n2fbipjm5yj.cloudfront.net/RANCH-COUCH/preview/RANCH-COUCH_Couches_0792.png',
      price: 2000.00,
      similar_products: [{
        url: 'https://d32n2fbipjm5yj.cloudfront.net/GWSOFA1/preview/GWSOFA1_Couches_0792.png',
        price: 199.99,
      },{
        price: 1200.00,
        url: 'https://d32n2fbipjm5yj.cloudfront.net/STYSOFA/preview/STYSOFA_Couches_0792.png',
      }]
    },{
      id: 111,
      index: 0,
      top: 39.4818,
      left: 57.1159,
      width: 7.87608,
      height: 7.90381,
      type: 'art',
      url: 'https://d32n2fbipjm5yj.cloudfront.net/MIN-FCC-GNA/preview/MIN-FCC-GNA_WallArt_0351.png',
      price: 100.00,
      similar_products: [],
    },{
      id: 112,
      index: 3,
      top: 76.284,
      left: 39.6117,
      width: 6.10141,
      height: 7.29,
      type: 'plant',
      url: 'https://d32n2fbipjm5yj.cloudfront.net/VBPLANT4/preview/VBPLANT4_Decor_0432.png',
      price: 250.00,
      similar_products: [],
    },{
      id: 113,
      index: 2,
      top: 81.6894,
      left: 32.4119,
      width: 34.4195,
      height: 16.5034,
      type: 'table',
      url: 'https://d32n2fbipjm5yj.cloudfront.net/MOCOFFETABLE/preview/MOCOFFETABLE_Main_0864.png',
      price: 300.00,
      similar_products: [],
    },{
      id: 114,
      index: 4,
      top: 68.5516,
      left: 2.43159,
      width: 26.9852,
      height: 28.1286,
      type: 'chair',
      url: 'https://d32n2fbipjm5yj.cloudfront.net/ARMCHAIR21/preview/ARMCHAIR21_Main_0848.png',
      price: 150.00,
      similar_products: [],
    }
  ],
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { roomType: null, roomPhoto: null, products: {}, displayProducts: {}, selectedProductType: null }
  }

  componentDidMount() {
    this.loadData().then(data => {
        var products = {};
        var roomData = data;
        roomData.products.map((product) => {
          products[product.type] = product;
          return products;
        });

        var displayProducts = Object.assign({}, products);
        this.setState({roomType: data.room_type, roomPhoto: data.room_photo, products: products, displayProducts: displayProducts})
    });
  }

  loadData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(getData());
            }, 2000);
        });
    }

  selectProduct(product) {
    this.setState({selectedProductType: product.type});
  }

  swapProduct(newProduct, productType) {
    const products = this.state.displayProducts;
    let newProductDisplay = Object.assign({}, products[productType]);
    newProductDisplay.url = newProduct.url;
    products[productType] = newProductDisplay;
    this.setState({displayProducts: products});
  }

  render() {
    let hasSimilarProducts = this.state.selectedProductType &&  this.state.products[this.state.selectedProductType].similar_products &&
    this.state.products[this.state.selectedProductType].similar_products.length > 0;
    return (
      <div className="App">
        <div className="room" style={{backgroundImage: `url(${this.state.roomPhoto})`}}>
          { Object.keys(this.state.displayProducts).map((productType, index) => {
            var product = this.state.displayProducts[productType];
            var imgStyle = {
              position: 'absolute',
              top: product.top + '%',
              left: product.left + '%',
              zIndex: product.index
            }
            return <img key={index} src={product.url} width={product.width + '%'} height={product.height + '%'} style={imgStyle} onClick={() => this.selectProduct(product)}/>
          })}
        </div>
        <div className="product-info">
          { this.state.selectedProductType &&
            <div>
              <div className="product-type">
              {this.state.selectedProductType}</div>
              <div className="products">
                <Thumbnail
                  selected={this.state.displayProducts[this.state.selectedProductType].url === this.state.products[this.state.selectedProductType].url}
                  product={this.state.products[this.state.selectedProductType]}
                  type={this.state.selectedProductType}
                swapProduct={this.swapProduct.bind(this)}/>
                {
                  hasSimilarProducts ?
                  this.state.products[this.state.selectedProductType].similar_products.map((product, i) => { return <Thumbnail
                    selected={this.state.displayProducts[this.state.selectedProductType].url === product.url}
                    product={product}
                    key={i} type={this.state.selectedProductType} swapProduct={this.swapProduct.bind(this)}/> }) : 'no similar products'
                }
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
