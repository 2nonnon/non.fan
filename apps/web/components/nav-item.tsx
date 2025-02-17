export const NavItem = ({ label, icon }: { label: string; icon: string }) => {
	return (
		<div className="flex items-center gap-2">
			<span className={icon} />
			<span className="hidden sm:inline">{label}</span>
		</div>
	);
};
