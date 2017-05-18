import React,{ PropTypes, Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
// import SearchBox from "react-google-maps/places/SearchBox";
import { connect } from 'react-redux'



class Map extends Component {

    constructor (props){
        super(props);
        this.state = {
            map: null,
            center: {
                lat: 10.7979865,
                lng: 106.7511866
            }
        }
        ;
    }
    handleMarkerClick = this.handleMarkerClick.bind(this);


    mapMoved(map){
        console.log('aaaa', JSON.stringify(this.state.map.getCenter()));
    }

    onZoomChanged(){
        console.log('Zoom change: ', this.state.map.getZoom())
    }

    mapLoaded(map){

        if(this.state.map != null)
            return;

        this.setState({
            map: map
        })
    }

    handleMarkerClick(index){
        console.log(index);
    }

    render() {

        const INPUT_STYLE = {
            boxSizing: `border-box`,
            MozBoxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `1px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
        };

        const GettingStartedGoogleMap = withGoogleMap(props => (
            <GoogleMap
                ref={this.mapLoaded.bind(this)}
                onDragEnd={this.mapMoved.bind(this)}
                onZoomChanged={this.onZoomChanged.bind(this)}
                defaultZoom={15}
                defaultCenter={this.state.center}
            >

                {/*<SearchBox*/}
                    {/*ref={props.onSearchBoxMounted}*/}
                    {/*bounds={props.bounds}*/}
                    {/*controlPosition={google.maps.ControlPosition.TOP_LEFT}*/}
                    {/*onPlacesChanged={props.onPlacesChanged}*/}
                    {/*inputPlaceholder="Customized your placeholder"*/}
                    {/*inputStyle={INPUT_STYLE}*/}
                {/*/>*/}


                {props.markers.map((marker, index) => (

                    <Marker key={index}
                        {...marker}
                        // onRightClick={() => props.onMarkerRightClick(index)}
                        onClick={() => props.onMarkerClick(marker)}
                    />
                ))}
            </GoogleMap>
        ));

        return (
            <div style={{height: `100%`}}>
                <GettingStartedGoogleMap
                    containerElement={
                        <div style={{ height: `100%` }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                    markers={this.props.markers}
                    onMarkerClick={this.handleMarkerClick.bind(this)}
                />
            </div>
        );
    }
}

export default connect()(Map);