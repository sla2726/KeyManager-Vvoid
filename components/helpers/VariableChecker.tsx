import React, { ReactNode } from 'react';

export function RenderChecker(variable: boolean, component: ReactNode) {
	return variable ? component : null;
}

export function ArrayRenderChecker(conditions: { variable: boolean; component: ReactNode }[]) {
	return conditions
		.filter((c) => c.variable === true)
		.map((c, index) => <React.Fragment key={index}>{c.component}</React.Fragment>);
}
