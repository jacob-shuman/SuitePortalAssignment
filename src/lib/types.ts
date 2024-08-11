export type ToastVariant = 'info' | 'success' | 'danger';

export enum ServiceType {
	Electrical = 'electrical',
	General = 'general',
	PestControl = 'pest-control',
	Plumbing = 'plumbing'
}

export interface MaintenanceRequest {
	// Name of the requester
	name: string;
	// Email of the requester
	email: string;
	// The unit # in the building
	unitNumber: string;
	// The type of service being requested
	serviceType: ServiceType;
	// A summary of of the issue
	summary: string;
	// Any extra details
	details?: string;
}
