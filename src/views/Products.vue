<!--TEMPLATE -->
<template>
	<div>
		<el-container class="container">
			<el-aside width="250px">
				<product-filter ref="filter" :products="products"></product-filter>
			</el-aside>
			<el-main class="content">
				<div class="found-products">Products: <span>{{filteredList.length}}</span></div>
				<div class="product-list">
					<div v-for="product in paginatedList" :key="product.name" class="product-item">
						<product-item :product="product"></product-item>
					</div>
				</div>

				<div class="center-container">
					<el-pagination
							v-if="filteredList.length"
							background
							layout="total, prev, pager, next"
							@current-change="pageChanged"
							:current-page="parseInt($route.params.page)"
							:page-size="pageSize"
							:page-count="pagesTotal">
					</el-pagination>
					<div class="no-products" v-else>
						<div class="message">No products found. Try to reset filter</div>
						<el-button @click="resetFilters" type="danger">Reset</el-button>
					</div>
				</div>
			</el-main>
		</el-container>
	</div>
</template>


<!-- SCOPED STYLE -->
<style lang="scss" scoped>
	.center-container{
		text-align: center;
	}
	.no-products{

		.message{
			color: #999;
			margin-bottom: 20px;
		}
	}
	.found-products{
		margin-bottom: 20px;
		color: #797878;

		span{
			font-weight: 600;
			color: #409EFF;
		}
	}
</style>


<!-- COMPONENT -->
<script>
	/** Import products from file */
	import products from '../../data.json'
	import ProductItem from '../components/ProductItem'
	import ProductFilter from '../components/ProductFilter'

	export default {

		name: 'Products',
		components: {
			ProductItem,
			ProductFilter
		},
		data() {
			return {
				products: products,
				pageSize: 5, //products quantity per page
				filteredList: products //all products by default
			}
		},
		watch:{
			$route(to, from){
				/** Filter products after queries changed, not pagination */
				if(JSON.stringify(to.query) !== JSON.stringify(from.query)){
					this.filterMethod();
				}
			}
		},
		computed:{
			/** Total pages count */
			pagesTotal(){
				return this.filteredList ? Math.ceil(this.filteredList.length / this.pageSize) : 0
			},
			/** Sliced list after pagination */
			paginatedList(){
				if(this.filteredList){
					const from = (this.$route.params.page - 1) * this.pageSize,
						to = from + this.pageSize;
					return this.filteredList.slice(from, to);
				}
				else{
					return []
				}
			}
		},
		created(){
			/** Filter products */
			this.filterMethod();

			/** Set first page if page params not exist */
			if(!this.$route.params.page)
				this.$router.push({params:{page: '1'}})

		},
		methods:{
			pageChanged(page){
				/** Change current page */
				this.$router.push({params: {page: page}, query: this.$route.query})
			},
			filterMethod(){
				/** Filter by name */
				const filteredByName = 	this.$route.query.search ? this.products.filter(product => product.name.toLowerCase().match(this.$route.query.search)):
					this.products;

				/** Filter result by price */
				const filteredByPrice = this.$route.query.minPrice ? filteredByName.filter((product) => {
					return product.price >= this.$route.query.minPrice && product.price <= this.$route.query.maxPrice
				}) : filteredByName;

				/** Filter result by brand */
				const filteredByBrand = this.$route.query.brands && this.$route.query.brands.length ? filteredByPrice.filter((product)=>{
					return this.$route.query.brands.indexOf(product.brand) != -1
				}) : filteredByPrice;

				/** Set result */
				this.filteredList = filteredByBrand
			},
			resetFilters(){
				this.$refs.filter.resetFilters();
			}
		}
	}
</script>

