import LoyalInfo from "@/components/client/LoyalInfo";

export default function CompanyLoyal({ params }: { params: { id: string } }) {
	const { id } = params;

	return (
		<div className="h-full">
			<LoyalInfo loyalId={id} />
		</div>
	);
}
