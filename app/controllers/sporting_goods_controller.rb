class SportingGoodsController < ApplicationController

	def index

		@sporting_goods = [
			{
				title: 'first sporting good'
			},
			{
				title: 'second sporting good'
			},
			{
				title: 'third sporting good'
			},
			{
				title: 'fourth sporting good'
			}
		]

	end

end