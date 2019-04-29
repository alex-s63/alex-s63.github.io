<!--TEMPLATE -->
<template>
	<div class="product">
		<div class="img-wrap">
			<img src="https://cdn.shopify.com/s/files/1/0099/5732/products/Product-Image-Unavailable_840c0990-5f4a-44dd-8b6f-24a01de82feb_large.png?v=1432669952" alt="err">
		</div>
		<div class="information">
			<div class="name">{{product.name}}</div>
			<div class="attributes">
				<div>
					<div class="label">Brand:</div>
					<div class="value">{{product.brand}}</div>
				</div>
				<div>
					<div class="label">Art. number:</div>
					<div class="value">{{product.artnumber}}</div>
				</div>
				<div>
					<div class="label">Weight:</div>
					<div class="value">{{product.weight}}</div>
				</div>
				<div>
					<div class="label">Quantity:</div>
					<div class="value">{{product.quantity}}</div>
				</div>
			</div>
		</div>
		<div class="price-block">
			<div class="stock" :class="{'available': product.stock === '1', 'not-available': product.stock === '0'}">
				{{product.stock === '1' ? 'Available' : 'Not available'}}
			</div>
			<div class="price">{{product.price}}$</div>
		</div>
	</div>
</template>


<!-- SCOPED STYLE -->
<style lang="scss" scoped>
	.product{
		display: flex;
		margin-bottom: 20px;
		border: 1px solid #e1e1e1;
		border-radius: 4px;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
		padding: 10px;

		.img-wrap{
			flex-shrink: 0;
			width: 200px;
			margin-right: 40px;

			img{
				width: 200px;
			}
		}
		.price-block{
			flex-shrink: 0;
		}
		.information{
			flex-grow: 1;
		}
		.attributes{

			&>div{
				display: flex;
			}
			.label{
				flex-shrink: 0;
				width: 120px;
				margin-right: 15px;
				color: #797878;
				margin-bottom: 10px;
			}
		}
		.name{
			color: #3e77aa;
			border-bottom: 2px dashed #3e77aa;
			font-weight: 600;
			font-size: 20px;
			margin-bottom: 20px;
			display: inline-block;
		}
		.price-block{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
		.price{
			text-align: right;
			font-weight: 600;
		}
		.stock{
			font-weight: 600;
			font-size: 18px;

			&.available{
				color: #00a046;
			}
			&.not-available{
				color: #fb515d;
			}
		}
	}
</style>


<!-- COMPONENT -->
<script>

	export default {

		name: 'ProductItem',
		props: {
			product: Object
		},
		data() {
			return {
			}
		},
	}
</script>

