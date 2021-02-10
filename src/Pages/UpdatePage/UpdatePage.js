import BankForm from '../../components/BankForm';
import './UpdatePage.css';

function UpdatePage() {
	return (
		<div className="updatePage">
			<span className="updateText"> Update Bank </span>
			<div>
				<BankForm isUpdate={true}/>
			</div>
		</div>
	);
}

export default UpdatePage;
