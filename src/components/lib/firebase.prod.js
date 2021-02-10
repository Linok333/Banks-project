import app from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyATCRQ_DnWgkO6Fd5iDS1wqw23a1XHgVQI',
	authDomain: 'banks-project-b9ac8.firebaseapp.com',
	databaseURL: 'https://banks-project-b9ac8-default-rtdb.firebaseio.com',
	projectId: 'banks-project-b9ac8',
	storageBucket: 'banks-project-b9ac8.appspot.com',
	messagingSenderId: '1015736480358',
	appId: '1:1015736480358:web:5d8f5b79758809dbb2b3a7',
	measurementId: 'G-BHJN3WR7T9',
};

export class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig);
		this.db = app.firestore();
	}

	async getData() {
		const arrayRef = this.db.collection('banks');
		const snapshot = await arrayRef.get();
		const arr = [];
		snapshot.forEach((doc) => {
			let obj = doc.data();
			obj = {
				...obj,
				id: doc.id,
			};
			arr.push(obj);
		});
		return arr;
	}

	async addData(obj) {
		const arrayRef = this.db.collection('banks');
		await arrayRef.add(obj);
	}

	async deleteData(id) {
		await this.db.collection('banks').doc(id).delete();
	}

	async updateData(id, obj) {
		await this.db.collection('banks').doc(id).update(obj);
	}
}
