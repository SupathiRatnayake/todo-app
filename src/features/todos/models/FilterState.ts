export type FilterState = {
	search: string;
	status: string;
	dueDate: Date | null;
    isDeleted?: boolean;
};
