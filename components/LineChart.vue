<script>
import { Line } from 'vue-chartjs'

export default {
	extends: Line,
	props: {
		chartData: {
			type: Array,
			default: function() {
				return []
			}
		}
	},
	data: () => ({
		options: {
			title: {
				display: true,
				text: 'Kuluvan vuorokauden lämpötilat'
			},
			chartArea: {
				backgroundColor: 'rgba(255, 255, 255, 0.4)'
			},
			scales: {
				xAxes: [
					{
						gridLines: {
							display: true
						},
						ticks: {
							fontColor: '#CCC'
						}
					}
				],
				yAxes: [
					{
						display: true,
						gridLines: {
							display: true
						},
						ticks: {
							fontColor: '#CCC'
						}
					}
				]
			}
		}
	}),
	mounted() {
		this.addPlugin({
			id: 'my-plugin',
			beforeDraw: function (chart, easing) {
				if (
					chart.config.options.chartArea &&
          chart.config.options.chartArea.backgroundColor
				) {
					const ctx = chart.chart.ctx
					const chartArea = chart.chartArea

					ctx.save()
					ctx.fillStyle = chart.config.options.chartArea.backgroundColor
					ctx.fillRect(
						chartArea.left,
						chartArea.top,
						chartArea.right - chartArea.left,
						chartArea.bottom - chartArea.top
					)
					ctx.restore()
				}
			}
		})

		this.renderChart(
			{
				labels: [
					'01',
					'02',
					'03',
					'04',
					'05',
					'06',
					'07',
					'08',
					'09',
					'10',
					'11',
					'12',
					'13',
					'14',
					'15',
					'16',
					'17',
					'18',
					'19',
					'20',
					'21',
					'22',
					'23',
					'24'
				],
				datasets: this.chartData
			},
			this.options
		)
	}
}
</script>
