import React from 'react';
import './App.css';
import CardList from '../component/CardList';
import Scroll from '../component/Scroll'
import SearchBox from '../component/SearchBox';
import { robots } from '../robots';
import ErrorBoundary from '../component/ErrorBoundary'
//State: Description of your app.

class App extends React.Component {
	constructor(){
		super();
		this.state={
			robots:[],
			searchfield:' '
		}
	}
	componentDidMount(){
		fetch("https://jsonplaceholder.typicode.com/users")
		.then(response =>response.json())
		.then(users =>this.setState({robots:users}));
		
	}

	onSearchChange= (event) =>{
		this.setState({searchfield:event.target.value});
		}

	render(){
			const filteredRobots=this.state.robots.filter((robot) =>{
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})
		return(
		<div className='tc'>
			<h1 className='f1'>RoboFriends</h1>
			<SearchBox searchChange={this.onSearchChange}/>
			<Scroll>
				<ErrorBoundary>
					<CardList robots={filteredRobots} />
				</ErrorBoundary>
			</Scroll>
		</div>
		);
	}
}
export default App;
