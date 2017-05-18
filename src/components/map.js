import React,{ Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { loadData, clickLocation } from '../actions';
import { connect } from 'react-redux'



class Map extends Component {

    constructor (props){
        super(props);
        this.state = {
            map: null,
            center: {},
            markers: []
        };
        this.handleMarkerClick = this.handleMarkerClick.bind(this);
    }

    mapMoved(map){

    }

    onZoomChanged(){

    }



    mapLoaded(map){

        if(this.state.map != null)
            return;

        this.setState({
            map: map
        })
    }

    handleMarkerClick(index){
        this.setState({
            center: index.position
        })
    }

    componentWillMount(){

    }

    componentWillReceiveProps(nextProps){
        let propsCenter = nextProps.data[nextProps.idexPosition].location.position;
        let propsMarker = [nextProps.data[nextProps.idexPosition].location];
        this.setState({
            center: propsCenter,
            markers: propsMarker
        });
    }

    render() {

        const GettingStartedGoogleMap = withGoogleMap(props => (
            <GoogleMap
                ref={this.mapLoaded.bind(this)}
                onDragEnd={this.mapMoved.bind(this)}
                onZoomChanged={this.onZoomChanged.bind(this)}
                defaultZoom={17}
                defaultCenter={this.state.center}
            >
                {props.markers.map((marker, index) => (

                    <Marker key={index}
                        {...marker}
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

                    markers={this.state.markers}
                    onMarkerClick={this.handleMarkerClick.bind(this)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.list,
        idexPosition: state.idexPosition
    }
};

export default connect(mapStateToProps, {loadData, clickLocation})(Map);