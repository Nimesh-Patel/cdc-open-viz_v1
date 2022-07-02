import React, {memo, useState, useEffect} from 'react'
import { scaleLinear } from 'd3-scale';
import countryCoordinates from './../data/v2/country-coordinates.csv'
import Papa from 'papaparse'

export const BubbleList = (
	{
		data: dataImport,
		state,
		projection,
		applyLegendToRow,
		applyTooltipsToGeo,
		handleCircleClick,
		runtimeData,
		displayGeoName
	}) => {

	const [data, setData] = useState(Object.values(dataImport))
	const maxDataValue = Math.max(...dataImport.map(d => d[state.columns.primary.name]))

	// Set bubble sizes
	var size = scaleLinear()
		.domain([1, maxDataValue])
		.range([state.visual.minBubbleSize, state.visual.maxBubbleSize])

	// Start looping through the countries to create the bubbles.
	const countries = runtimeData && Object.values(runtimeData).map( (country, index) => {

		// Read in country codes, shift to get rid of header on table.
		const countriesFromCsv = Papa.parse(countryCoordinates).data;
		countriesFromCsv.shift()

		/**
		 *	This sets the coordinates property on the country object.
		 *  The imported datas structure is: ['USA', [lat, long]
		 *	Returns the country coordinates as a STRING, later we use JSON.parse to get the array.
		*/
		country.coordinates = countriesFromCsv.filter(filtered => filtered[0] === country.uid).map(item => item[1])[0]

		let {coordinates} = country

		if(!coordinates) return true;

		// Force an array from the string '[lat,long]'
		coordinates = JSON.parse(coordinates)
		
		const countryName = displayGeoName(country[state.columns.geo.name]);
		const toolTip = applyTooltipsToGeo(countryName, country);
		const legendColors = applyLegendToRow(country);
		const dataColumnName = state.columns.primary.name
		const longitude = Number(coordinates[1])
		const latitude = Number(coordinates[0])
		const transform = `translate(${projection( [longitude, latitude] )})`

		const circle = (
			<circle
				key={`circle-${countryName.replace(' ', '')}`}
				data-tip={toolTip}
				data-for="tooltip"
				className="bubble"
				cx={ Number(projection(coordinates[1], coordinates[0])[0]) || 0  } // || 0 handles error on loads where the data isn't ready
				cy={ Number(projection(coordinates[1], coordinates[0])[1]) || 0 }
				r={ Number(size(country[dataColumnName])) }
				fill={legendColors[0] }
				stroke={legendColors[0]}
				strokeWidth={3}
				fillOpacity={.4}
				onClick={() => handleCircleClick(country)}
				transform={transform}
				style={{ transition: 'all .25s ease-in-out', cursor: "pointer" }}
			/>
		);
	

		return (
			<g key={`group-${countryName.replace(' ', '')}`}>
				{circle}
			</g>
		)
	})
	return countries;
}
export default memo(BubbleList)
