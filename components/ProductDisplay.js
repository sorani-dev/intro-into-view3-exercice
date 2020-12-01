app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img :src="image" :class="{ 'out-of-stock-img': !inStock }">
          </div>
          <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ sale }}</p>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>

            <p>Shipping: {{ shipping }}</p>

            <product-details :details="details"></product-details>
            <div class="color-circle" v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)" :style="{ backgroundColor: variant.color }"></div>
            <button class="button" :class="{ disabledButton: !inStock }" :disabled="!inStock" v-on:click="addToCart">Add to Cart</button> <br/>       
                <button class="button" :class="{}"  @click="removeFromCart">Remove item</button>
          </div>
        </div>
      </div>`,
  data() {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      onSale: false,
      selectedVariant: 0, // index of the variant currently hovered on
      details: ['50% cotton', '30% wool', '20% polyester'],
      variants: [
        { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
        { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
      ],
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
    },
    updateVariant(index) {
      this.selectedVariant = index
    },
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity
    },
    sale() {
      return this.onSale ? `${this.brand} ${this.product} is on sale` : ''
    },
    shipping() {
      return this.premium ? 'Free' : 2.99
    },
  },
})
