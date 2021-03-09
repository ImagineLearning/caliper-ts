/** This file was Autogenerated */

import { Selector } from './Selector';
import { SelectorType } from './SelectorType';

export interface TextPositionSelector extends Selector {
	start: number;
	end: number;
}

export interface ITextPositionSelectorParams {
	start: number;
	end: number;
}

export function TextPositionSelector(params: ITextPositionSelectorParams): TextPositionSelector {
	return {
		type: SelectorType.TextPositionSelector,
		...params,
	};
}
