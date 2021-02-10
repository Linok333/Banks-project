import BankForm from '../../components/BankForm';
import './CreatePage.css';

function CreatePage() {
	return (
		<div className="createPage">
			<span className="createText"> Create Bank </span>
			<div>
				<BankForm isUpdate={false}/>
			</div>
		</div>
	);
}
export default CreatePage;
