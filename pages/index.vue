<template>
	<div class="container">
		<div class="row mt-2">
			<div
				v-for="tag in temperatures"
				:key="tag.id"
				class="col-md-4 col-sm-12">
				<div class="card border-dark mb-3">
					<div
						class="card-header text-center"
						@click="goTodetail(tag.id)">
						{{ tag.label }}
					</div>
					<div class="card-body text-dark">
						<h1 class="card-text text-center">
							<i class="fa fa-thermometer-empty mr-1" />{{ tag.data.slice(-1).pop() }}&#8451;
						</h1>
					</div>
				</div>
			</div>
		</div>
		<div class="row mt-2">
			<div class="col-md-12">
				<div
					v-if="showError"
					class="error-message">
					{{ errorMessage }}
				</div>
				<line-chart
					v-if="loaded"
					:chart-data="temperatures" />
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
import LineChart from '~/components/LineChart.vue'

export default {
	components: {
		LineChart
	},
	data: () => ({
		loaded: false,
		temperatures: [],
		showError: false,
		errorMessage: 'Antureiden haku ei onnistunut'
	}),
	mounted() {
		this.resetState()
		axios
			.get('/api/tagdata')
			.then((response) => {
				this.temperatures = response.data.temperatures
				this.loaded = true
			})
			.catch((err) => {
				this.errorMessage = err.response.data.error
				this.showError = true
			})
	},
	methods: {
		resetState() {
			this.loaded = false
			this.showError = false
		},
		goTodetail(prodId) {
			this.$router.push({ name: 'tag', params: { id: prodId } })
		}
	}
}
</script>
