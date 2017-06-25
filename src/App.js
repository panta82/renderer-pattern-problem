import React, {Component} from 'react';

import {AutoSizer, List} from 'react-virtualized';

import 'react-virtualized/styles.css';
import './App.css';

const list = [
	`1. The Beatles (Liverpool)`,
	`2. Rolling Stones (London)`,
	`3. Led Zeppelin (London)`,
	`4. The Who (London)`,
	`5. The Jimi Hendrix Experience (London)`,
	`6. Pink Floyd (London)`,
	`7. The Clash (London)`,
	`8. Cream (London)`,
	`9. Elton John (Middlesex)`,
	`10. Queen (London)`,
	`11. Black Sabbath (Birmingham)`,
	`12. David Bowie (Brixton)`,
	`13. The Kinks (London)`,
	`14. Emerson, Lake and Palmer (London)`,
	`15. Fleetwood Mac (London)`,
	`16. Deep Purple (Hertford)`,
	`17. Joe Cocker (Sheffield)`,
	`18. Iron Maiden (London)`,
	`19. The Yardbirds (London)`,
	`20. Dire Straits (London)`,
	`21. Jethro Tull (London)`,
	`22. The Police (London)`,
	`23. King Crimson (London)`,
	`24. Moody Blues (Birmingham)`,
	`25. Rod Stewart (London)`,
	`26. Sex Pistols (London)`,
	`27. The Animals (Newcastle)`,
	`28. The Cure (Crawley)`,
	`29. Status Quo (Minehead)`,
	`30. Paul McCartney (Liverpool)`,
	`31. Cat Stevens (London)`,
	`32. Eric Clapton (Riply)`,
	`33. Sting (Newcastle)`,
	`34. John Lennon (Liverpool)`,
	`35. The Faces (London)`,
	`36. Genesis (London)`,
	`37. Electric Light Orchestra (London)`,
	`38. Peter Gabriel (London)`,
	`39. The Smiths (Manchester)`,
	`40. Yes (London)`,
	`41. Jeff Beck (Surrey)`,
	`42. Radiohead (Oxford)`,
	`43. The Hollies (Manchester)`,
	`44. Peter Frampton (Kent)`,
	`45. The Pretty Things (London)`,
	`46. Judas Priest (Birmingham)`,
	`47. Small Faces (London)`,
	`48. John Mayall's Bluesbreakers (London)`,
	`49. Uriah Heep (Walthamsow)`,
	`50. Motorhead (London)`,
	`51. Oasis (Manchester)`,
	`52. Ozzy Osbourne (Birmingham)`,
	`53. Phil Collins (London)`,
	`54. Whitesnake (London)`,
	`55. George Harrison (Liverpool)`,
	`56. The Nice (London)`,
	`57. Eurythmics (London)`,
	`58. Manfred Mann's Earth Band (London)`,
	`59. Def Leppard (Sheffield)`,
	`60. PIL (Andover)`,
	`61. Osibisa (London)`,
	`62. Procol Harum (Essex)`,
	`63. Blind Faith (Aston-Tirrold)`,
	`64. The Stone Roses (Manchester)`,
	`65. The Dave Clark Five (London)`,
	`66. UltraVox (London)`,
	`67. Coldplay (London)`,
	`68. Robbie Williams (London)`,
	`69. Blur (Colchester)`,
	`70. Herman's Hermits (Manchester)`,
	`71. Massive Attack (Bristol)`,
	`72. Placebo (London)`,
	`73. Prodigy (London)`,
	`74. Mandala (London)`,
	`75. Free (London)`,
	`76. Traffic (Birmingham)`,
	`77. Gravy Train (Lancashire)`,
	`78. Joy Division (Manchester)`,
	`79. Ten Years After (Nottingham)`,
	`80. Depeche Mode (London)`,
	`81. Porcupine Tree (London)`,
	`82. Robert Plant (Staffordshire)`,
	`83. The Zombies (St Albans, London)`,
	`84. The Jam (London)`,
	`85. Henry Cow (London)`,
	`86. T-Rex (London)`,
	`87. Wishbone Ash (Devon)`,
	`88. Gomez (Southport)`,
	`89. Morrissey (Manchester)`,
	`90. Muse (Teignmouth, Devon)`,
	`91. The Verve (Wigan)`,
	`92. Humble Pie (Essex)`,
	`93. Van der graaf Generator (Manchester)`,
	`94. Rick Wakeman (Middlesex)`,
	`95. The Groundhogs (London)`,
	`96. The Darkness (Lowestoft)`,
	`97. Jesus and Mary Chain (London)`,
	`98. The Herd (Manchester)`,
	`99. Richard Ashcroft (Wigan)`,
	`100. Marillion (Aylesbury)`,
];

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cutOff: list.length,
			items: list.slice(),
			useBound: false
		};

		this.rowRenderer = this.rowRenderer.bind(this);
		this.boundListRenderer = this.boundListRenderer.bind(this);
	};

	changeCutOff(delta) {
		const cutOff = Math.min(Math.max(this.state.cutOff + delta, 0), list.length);
		const items = list.slice(0, cutOff);
		this.setState({cutOff, items});
	}

	rowRenderer({key, index, style}) {
		return (
			<div key={key} style={style}>
				{this.state.items[index]}
			</div>
		)
	}

	boundListRenderer({height, width}) {
		return (
			<List
				height={height}
				rowCount={this.state.items.length}
				rowHeight={20}
				rowRenderer={this.rowRenderer}
				width={width}
			/>
		);
	}

	render() {
		const localListRenderer = ({height, width}) => {
			return (
				<List
					height={height}
					rowCount={this.state.items.length}
					rowHeight={20}
					rowRenderer={this.rowRenderer}
					width={width}
				/>
			);
		};

		const listRenderer = this.state.useBound
			? this.boundListRenderer
			: localListRenderer;

		return (
			<div className="App">
				<h1>Problem demo</h1>

				<div style={{
					margin: 'auto 30px',
				}}>
					<button type="button" onClick={() => this.changeCutOff(-10)}>
						Cutoff -10
					</button>
					<button type="button" onClick={() => this.changeCutOff(+10)}>
						Cutoff +10
					</button>
				</div>
				<div style={{
					margin: 'auto 30px',
				}}>
					<p>Check this to see the problem:</p>
					<label>
						<input type="checkbox" checked={this.state.useBound}
							onChange={() => this.setState({useBound: !this.state.useBound})} />
						Use bound item renderer
					</label>
				</div>

				<div style={{
					position: 'relative',
					height: '700px',
					width: '768px',
					background: '#eee',
					margin: '10px auto',
					border: '2px solid black'
				}}>
					<AutoSizer>
						{listRenderer}
					</AutoSizer>
				</div>
			</div>
		);
	}
}

export default App;
