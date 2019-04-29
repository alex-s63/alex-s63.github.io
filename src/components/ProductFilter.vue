<!--TEMPLATE -->
<template>
	<div class="filter">
		<div class="label">Search:</div>
		<div class="search">
			<el-input v-model="search"></el-input>
			<el-button @click="searchProducts" type="primary" icon="el-icon-search"></el-button>
		</div>
		<div class="label">Price:</div>
		<div class="price">
			<div class="min">{{price[0]}}</div>
			<el-slider
					v-model="price"
					:min="priceRange.min"
					:max="priceRange.max"
					range>
			</el-slider>
			<div class="max">{{price[1]}}</div>
		</div>
		<div class="label">Brands:</div>
		<div class="brands">
			<el-checkbox-group v-model="brands">
				<el-checkbox v-for="brand in allBrands" :key="brand" :label="brand"></el-checkbox>
			</el-checkbox-group>
		</div>

		<div class="center-container">
			<el-button @click="resetFilters" type="danger">Reset</el-button>
			<el-button @click="setFilters" type="primary">Find</el-button>
		</div>
	</div>
</template>


<!-- SCOPED STYLE -->
<style lang="scss" scoped>
	.filter{
		padding-top: 20px;

		.label{
			margin-bottom: 20px;
			color: #797878;
		}
		.search{
			display: flex;
			margin-bottom: 40px;

			.el-input{
				margin-right: 10px;
			}
		}
		.price{
			padding: 0 30px;
			position: relative;
			margin-bottom: 40px;

			.min{
				position: absolute;
				left: 0px;
				top: -7px;
				font-size: 14px;
			}
			.max{
				position: absolute;
				right: 0px;
				top: -7px;
				font-size: 14px;
			}
		}
		.brands{
			padding: 20px;
			border: 1px solid #e1e1e1;
			border-radius: 4px;
			margin-bottom: 40px;

			.el-checkbox{
				display: block;
				margin-bottom: 15px;
			}
		}
		.center-container{
			text-align: center;
		}
	}
</style>


<!-- COMPONENT -->
<script>

	export default {

		name: 'ProductFilter',
		props:{
			products: Array
		},
		data() {
			return {
				search: '',
				price:[0,0],
				brands: [],
			}
		},
		computed:{
			/** Min/max price in array for range */
			priceRange(){
				/** Collect price array */
				const price = {};
				const prices = this.products.map(product => product.price)

				price.min = Math.min(...prices);
				price.max = Math.max(...prices);
				return price
			},
			allBrands(){
				/** Collect all products */
				const brands = this.products.map(product => product.brand);

				/** Remove duplicates */
				return brands.filter((value, index, array)=> array.indexOf(value) === index)
			}
		},
		created(){
			/** set price range from min to max */
			this.price[0] = this.priceRange.min;
			this.price[1] = this.priceRange.max;

			/** Set queries from url to fields if exist */
			if(this.$route.query.search)
				this.search = this.$route.query.search;
			if (this.$route.query.brands)
				this.brands = this.$route.query.brands;
			if (this.$route.query.minPrice && this.$route.query.maxPrice){
				this.price[0] = this.$route.query.minPrice;
				this.price[1] = this.$route.query.maxPrice;
			}
		},
		methods:{
			searchProducts(){
				/** Set first page before filtering and append new query */
				const query = Object.assign({}, this.$route.query, {search: this.search})
				this.$router.push({params: {page: '1'}, query: query})
			},
			setFilters(){
				/** Set first page before filtering nd append new query */
				const query = Object.assign({}, this.$route.query, {minPrice: this.price[0], maxPrice: this.price[1]}, {brands: this.brands});
				this.$router.push({params: {page: '1'}, query: query})
			},
			resetFilters(){
				this.$router.push({query: {}})
			}
		}
	}
</script>

