import { t as cn } from "./utils-DJjaB2Tv.js";
import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Heading } from "./heading-COoAH6p0.js";
import { t as edit } from "./security-v_B6Kg-C.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { t as PasswordInput } from "./password-input-BX5lEUa-.js";
import { t as Spinner } from "./spinner-DkICJePw.js";
import { a as regenerateRecoveryCodes, c as InputOTPGroup, i as enable, l as InputOTPSlot, n as confirm, r as disable, s as InputOTP, t as useTwoFactorAuth } from "./use-two-factor-auth-DDHSrTuw.js";
import { t as SecurityController } from "./SecurityController-D1wGCFsz.js";
import { i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-CK7BMMcU.js";
import { Form, Head } from "@inertiajs/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { AlertCircleIcon, Check, Copy, Eye, EyeOff, LockKeyhole, RefreshCw, ScanLine, ShieldCheck } from "lucide-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
//#region resources/js/components/ui/alert.tsx
var alertVariants = cva("relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current", {
	variants: { variant: {
		default: "bg-background text-foreground",
		destructive: "text-destructive-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-destructive-foreground/80"
	} },
	defaultVariants: { variant: "default" }
});
function Alert({ className, variant, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert",
		role: "alert",
		className: cn(alertVariants({ variant }), className),
		...props
	});
}
function AlertTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert-title",
		className: cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className),
		...props
	});
}
function AlertDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert-description",
		className: cn("text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed", className),
		...props
	});
}
//#endregion
//#region resources/js/components/alert-error.tsx
function AlertError({ errors, title }) {
	return /* @__PURE__ */ jsxs(Alert, {
		variant: "destructive",
		children: [
			/* @__PURE__ */ jsx(AlertCircleIcon, {}),
			/* @__PURE__ */ jsx(AlertTitle, { children: title || "Something went wrong." }),
			/* @__PURE__ */ jsx(AlertDescription, { children: /* @__PURE__ */ jsx("ul", {
				className: "list-inside list-disc text-sm",
				children: Array.from(new Set(errors)).map((error, index) => /* @__PURE__ */ jsx("li", { children: error }, index))
			}) })
		]
	});
}
//#endregion
//#region resources/js/components/two-factor-recovery-codes.tsx
function TwoFactorRecoveryCodes({ recoveryCodesList, fetchRecoveryCodes, errors }) {
	const [codesAreVisible, setCodesAreVisible] = useState(false);
	const codesSectionRef = useRef(null);
	const canRegenerateCodes = recoveryCodesList.length > 0 && codesAreVisible;
	const toggleCodesVisibility = useCallback(async () => {
		if (!codesAreVisible && !recoveryCodesList.length) await fetchRecoveryCodes();
		setCodesAreVisible(!codesAreVisible);
		if (!codesAreVisible) setTimeout(() => {
			codesSectionRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "nearest"
			});
		});
	}, [
		codesAreVisible,
		recoveryCodesList.length,
		fetchRecoveryCodes
	]);
	useEffect(() => {
		if (!recoveryCodesList.length) fetchRecoveryCodes();
	}, [recoveryCodesList.length, fetchRecoveryCodes]);
	return /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsxs(CardTitle, {
		className: "flex gap-3",
		children: [/* @__PURE__ */ jsx(LockKeyhole, {
			className: "size-4",
			"aria-hidden": "true"
		}), "Kode pemulihan 2FA"]
	}), /* @__PURE__ */ jsx(CardDescription, { children: "Kode pemulihan membantumu mendapatkan akses kembali jika perangkat 2FA hilang. Simpan di pengelola kata sandi aman." })] }), /* @__PURE__ */ jsxs(CardContent, { children: [/* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-3 select-none sm:flex-row sm:items-center sm:justify-between",
		children: [/* @__PURE__ */ jsxs(Button, {
			onClick: toggleCodesVisibility,
			className: "w-fit",
			"aria-expanded": codesAreVisible,
			"aria-controls": "recovery-codes-section",
			children: [
				/* @__PURE__ */ jsx(codesAreVisible ? EyeOff : Eye, {
					className: "size-4",
					"aria-hidden": "true"
				}),
				codesAreVisible ? "Sembunyikan" : "Lihat",
				" kode pemulihan"
			]
		}), canRegenerateCodes && /* @__PURE__ */ jsx(Form, {
			...regenerateRecoveryCodes.form(),
			options: { preserveScroll: true },
			onSuccess: fetchRecoveryCodes,
			children: ({ processing }) => /* @__PURE__ */ jsxs(Button, {
				variant: "secondary",
				type: "submit",
				disabled: processing,
				"aria-describedby": "regenerate-warning",
				children: [/* @__PURE__ */ jsx(RefreshCw, {}), " Buat ulang kode"]
			})
		})]
	}), /* @__PURE__ */ jsx("div", {
		id: "recovery-codes-section",
		className: `relative overflow-hidden transition-all duration-300 ${codesAreVisible ? "h-auto opacity-100" : "h-0 opacity-0"}`,
		"aria-hidden": !codesAreVisible,
		children: /* @__PURE__ */ jsx("div", {
			className: "mt-3 space-y-3",
			children: errors?.length ? /* @__PURE__ */ jsx(AlertError, { errors }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", {
				ref: codesSectionRef,
				className: "grid gap-1 rounded-lg bg-muted p-4 font-mono text-sm",
				role: "list",
				"aria-label": "Kode pemulihan",
				children: recoveryCodesList.length ? recoveryCodesList.map((code, index) => /* @__PURE__ */ jsx("div", {
					role: "listitem",
					className: "select-text",
					children: code
				}, index)) : /* @__PURE__ */ jsx("div", {
					className: "space-y-2",
					"aria-label": "Memuat kode pemulihan",
					children: Array.from({ length: 8 }, (_, index) => /* @__PURE__ */ jsx("div", {
						className: "h-4 animate-pulse rounded bg-muted-foreground/20",
						"aria-hidden": "true"
					}, index))
				})
			}), /* @__PURE__ */ jsx("div", {
				className: "text-xs text-muted-foreground select-none",
				children: /* @__PURE__ */ jsxs("p", {
					id: "regenerate-warning",
					children: [
						"Setiap kode pemulihan hanya dapat dipakai sekali untuk mengakses akun dan akan dihapus setelah digunakan. Jika perlu lebih banyak, klik",
						" ",
						/* @__PURE__ */ jsx("span", {
							className: "font-bold",
							children: "Buat ulang kode"
						}),
						" ",
						"di atas."
					]
				})
			})] })
		})
	})] })] });
}
//#endregion
//#region resources/js/hooks/use-clipboard.ts
function useClipboard() {
	const [copiedText, setCopiedText] = useState(null);
	const copy = async (text) => {
		if (!navigator?.clipboard) {
			console.warn("Clipboard not supported");
			return false;
		}
		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
			return true;
		} catch (error) {
			console.warn("Copy failed", error);
			setCopiedText(null);
			return false;
		}
	};
	return [copiedText, copy];
}
//#endregion
//#region resources/js/components/two-factor-setup-modal.tsx
function GridScanIcon() {
	return /* @__PURE__ */ jsx("div", {
		className: "mb-3 rounded-full border border-border bg-card p-0.5 shadow-sm",
		children: /* @__PURE__ */ jsxs("div", {
			className: "relative overflow-hidden rounded-full border border-border bg-muted p-2.5",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0 grid grid-cols-5 opacity-50",
					children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ jsx("div", { className: "border-r border-border last:border-r-0" }, `col-${i + 1}`))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0 grid grid-rows-5 opacity-50",
					children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ jsx("div", { className: "border-b border-border last:border-b-0" }, `row-${i + 1}`))
				}),
				/* @__PURE__ */ jsx(ScanLine, { className: "relative z-20 size-6 text-foreground" })
			]
		})
	});
}
function TwoFactorSetupStep({ qrCodeSvg, manualSetupKey, buttonText, onNextStep, errors }) {
	const [copiedText, copy] = useClipboard();
	const IconComponent = copiedText === manualSetupKey ? Check : Copy;
	return /* @__PURE__ */ jsx(Fragment$1, { children: errors?.length ? /* @__PURE__ */ jsx(AlertError, { errors }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx("div", {
			className: "mx-auto flex max-w-md overflow-hidden",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto aspect-square w-64 rounded-lg border border-border",
				children: /* @__PURE__ */ jsx("div", {
					className: "z-10 flex h-full w-full items-center justify-center p-5",
					children: qrCodeSvg ? /* @__PURE__ */ jsx("div", {
						className: "aspect-square w-full rounded-lg bg-white p-2 [&_svg]:size-full",
						dangerouslySetInnerHTML: { __html: qrCodeSvg }
					}) : /* @__PURE__ */ jsx(Spinner, {})
				})
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "flex w-full space-x-5",
			children: /* @__PURE__ */ jsx(Button, {
				className: "w-full",
				onClick: onNextStep,
				children: buttonText
			})
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "relative flex w-full items-center justify-center",
			children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 top-1/2 h-px w-full bg-border" }), /* @__PURE__ */ jsx("span", {
				className: "relative bg-card px-2 py-1",
				children: "or, enter the code manually"
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "flex w-full space-x-2",
			children: /* @__PURE__ */ jsx("div", {
				className: "flex w-full items-stretch overflow-hidden rounded-xl border border-border",
				children: !manualSetupKey ? /* @__PURE__ */ jsx("div", {
					className: "flex h-full w-full items-center justify-center bg-muted p-3",
					children: /* @__PURE__ */ jsx(Spinner, {})
				}) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("input", {
					type: "text",
					readOnly: true,
					value: manualSetupKey,
					className: "h-full w-full bg-background p-3 text-foreground outline-none"
				}), /* @__PURE__ */ jsx("button", {
					onClick: () => copy(manualSetupKey),
					className: "border-l border-border px-3 hover:bg-muted",
					children: /* @__PURE__ */ jsx(IconComponent, { className: "w-4" })
				})] })
			})
		})
	] }) });
}
function TwoFactorVerificationStep({ onClose, onBack }) {
	const [code, setCode] = useState("");
	const pinInputContainerRef = useRef(null);
	useEffect(() => {
		setTimeout(() => {
			pinInputContainerRef.current?.querySelector("input")?.focus();
		}, 0);
	}, []);
	return /* @__PURE__ */ jsx(Form, {
		...confirm.form(),
		onSuccess: () => onClose(),
		resetOnError: true,
		resetOnSuccess: true,
		children: ({ processing, errors }) => /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsxs("div", {
			ref: pinInputContainerRef,
			className: "relative w-full space-y-3",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex w-full flex-col items-center space-y-3 py-2",
				children: [/* @__PURE__ */ jsx(InputOTP, {
					id: "otp",
					name: "code",
					maxLength: 6,
					onChange: setCode,
					disabled: processing,
					pattern: REGEXP_ONLY_DIGITS,
					children: /* @__PURE__ */ jsx(InputOTPGroup, { children: Array.from({ length: 6 }, (_, index) => /* @__PURE__ */ jsx(InputOTPSlot, { index }, index)) })
				}), /* @__PURE__ */ jsx(InputError, { message: errors?.confirmTwoFactorAuthentication?.code })]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex w-full space-x-5",
				children: [/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					className: "flex-1",
					onClick: onBack,
					disabled: processing,
					children: "Back"
				}), /* @__PURE__ */ jsx(Button, {
					type: "submit",
					className: "flex-1",
					disabled: processing || code.length < 6,
					children: "Confirm"
				})]
			})]
		}) })
	});
}
function TwoFactorSetupModal({ isOpen, onClose, requiresConfirmation, twoFactorEnabled, qrCodeSvg, manualSetupKey, clearSetupData, fetchSetupData, errors }) {
	const [showVerificationStep, setShowVerificationStep] = useState(false);
	const modalConfig = useMemo(() => {
		if (twoFactorEnabled) return {
			title: "Two-factor authentication enabled",
			description: "Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.",
			buttonText: "Close"
		};
		if (showVerificationStep) return {
			title: "Verify authentication code",
			description: "Enter the 6-digit code from your authenticator app",
			buttonText: "Continue"
		};
		return {
			title: "Enable two-factor authentication",
			description: "To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app",
			buttonText: "Continue"
		};
	}, [twoFactorEnabled, showVerificationStep]);
	const resetModalState = useCallback(() => {
		setShowVerificationStep(false);
		clearSetupData();
	}, [clearSetupData]);
	const handleClose = useCallback(() => {
		resetModalState();
		onClose();
	}, [onClose, resetModalState]);
	const handleModalNextStep = useCallback(() => {
		if (requiresConfirmation) {
			setShowVerificationStep(true);
			return;
		}
		handleClose();
	}, [requiresConfirmation, handleClose]);
	const fetchSetupDataRef = useRef(fetchSetupData);
	useEffect(() => {
		fetchSetupDataRef.current = fetchSetupData;
	}, [fetchSetupData]);
	useEffect(() => {
		if (isOpen && !qrCodeSvg) fetchSetupDataRef.current();
	}, [isOpen, qrCodeSvg]);
	return /* @__PURE__ */ jsx(Dialog, {
		open: isOpen,
		onOpenChange: (open) => !open && handleClose(),
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "sm:max-w-md",
			children: [/* @__PURE__ */ jsxs(DialogHeader, {
				className: "flex items-center justify-center",
				children: [
					/* @__PURE__ */ jsx(GridScanIcon, {}),
					/* @__PURE__ */ jsx(DialogTitle, { children: modalConfig.title }),
					/* @__PURE__ */ jsx(DialogDescription, {
						className: "text-center",
						children: modalConfig.description
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "flex flex-col items-center space-y-5",
				children: showVerificationStep ? /* @__PURE__ */ jsx(TwoFactorVerificationStep, {
					onClose: handleClose,
					onBack: () => setShowVerificationStep(false)
				}) : /* @__PURE__ */ jsx(TwoFactorSetupStep, {
					qrCodeSvg,
					manualSetupKey,
					buttonText: modalConfig.buttonText,
					onNextStep: handleModalNextStep,
					errors
				})
			})]
		})
	});
}
//#endregion
//#region resources/js/pages/settings/security.tsx
function Security({ canManageTwoFactor = false, requiresConfirmation = false, twoFactorEnabled = false }) {
	const passwordInput = useRef(null);
	const currentPasswordInput = useRef(null);
	const { qrCodeSvg, hasSetupData, manualSetupKey, clearSetupData, clearTwoFactorAuthData, fetchSetupData, recoveryCodesList, fetchRecoveryCodes, errors } = useTwoFactorAuth();
	const [showSetupModal, setShowSetupModal] = useState(false);
	const prevTwoFactorEnabled = useRef(twoFactorEnabled);
	useEffect(() => {
		if (prevTwoFactorEnabled.current && !twoFactorEnabled) clearTwoFactorAuthData();
		prevTwoFactorEnabled.current = twoFactorEnabled;
	}, [twoFactorEnabled, clearTwoFactorAuthData]);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Security settings" }),
		/* @__PURE__ */ jsx("h1", {
			className: "sr-only",
			children: "Security settings"
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ jsx(Heading, {
				variant: "small",
				title: "Update password",
				description: "Ensure your account is using a long, random password to stay secure"
			}), /* @__PURE__ */ jsx(Form, {
				...SecurityController.update.form(),
				options: { preserveScroll: true },
				resetOnError: [
					"password",
					"password_confirmation",
					"current_password"
				],
				resetOnSuccess: true,
				onError: (errors) => {
					if (errors.password) passwordInput.current?.focus();
					if (errors.current_password) currentPasswordInput.current?.focus();
				},
				className: "space-y-6",
				children: ({ errors, processing }) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "current_password",
								children: "Current password"
							}),
							/* @__PURE__ */ jsx(PasswordInput, {
								id: "current_password",
								ref: currentPasswordInput,
								name: "current_password",
								className: "mt-1 block w-full",
								autoComplete: "current-password",
								placeholder: "Current password"
							}),
							/* @__PURE__ */ jsx(InputError, { message: errors.current_password })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "password",
								children: "Kata sandi baru"
							}),
							/* @__PURE__ */ jsx(PasswordInput, {
								id: "password",
								ref: passwordInput,
								name: "password",
								className: "mt-1 block w-full",
								autoComplete: "new-password",
								placeholder: "Kata sandi baru"
							}),
							/* @__PURE__ */ jsx(InputError, { message: errors.password })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "password_confirmation",
								children: "Konfirmasi kata sandi"
							}),
							/* @__PURE__ */ jsx(PasswordInput, {
								id: "password_confirmation",
								name: "password_confirmation",
								className: "mt-1 block w-full",
								autoComplete: "new-password",
								placeholder: "Konfirmasi kata sandi"
							}),
							/* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation })
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex items-center gap-4",
						children: /* @__PURE__ */ jsx(Button, {
							disabled: processing,
							"data-test": "update-password-button",
							children: "Simpan kata sandi"
						})
					})
				] })
			})]
		}),
		canManageTwoFactor && /* @__PURE__ */ jsxs("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ jsx(Heading, {
					variant: "small",
					title: "Two-factor authentication",
					description: "Manage your two-factor authentication settings"
				}),
				twoFactorEnabled ? /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-start justify-start space-y-4",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "You will be prompted for a secure, random pin during login, which you can retrieve from the TOTP-supported application on your phone."
						}),
						/* @__PURE__ */ jsx("div", {
							className: "relative inline",
							children: /* @__PURE__ */ jsx(Form, {
								...disable.form(),
								children: ({ processing }) => /* @__PURE__ */ jsx(Button, {
									variant: "destructive",
									type: "submit",
									disabled: processing,
									children: "Disable 2FA"
								})
							})
						}),
						/* @__PURE__ */ jsx(TwoFactorRecoveryCodes, {
							recoveryCodesList,
							fetchRecoveryCodes,
							errors
						})
					]
				}) : /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-start justify-start space-y-4",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "When you enable two-factor authentication, you will be prompted for a secure pin during login. This pin can be retrieved from a TOTP-supported application on your phone."
					}), /* @__PURE__ */ jsx("div", { children: hasSetupData ? /* @__PURE__ */ jsxs(Button, {
						onClick: () => setShowSetupModal(true),
						children: [/* @__PURE__ */ jsx(ShieldCheck, {}), "Continue setup"]
					}) : /* @__PURE__ */ jsx(Form, {
						...enable.form(),
						onSuccess: () => setShowSetupModal(true),
						children: ({ processing }) => /* @__PURE__ */ jsx(Button, {
							type: "submit",
							disabled: processing,
							children: "Enable 2FA"
						})
					}) })]
				}),
				/* @__PURE__ */ jsx(TwoFactorSetupModal, {
					isOpen: showSetupModal,
					onClose: () => setShowSetupModal(false),
					requiresConfirmation,
					twoFactorEnabled,
					qrCodeSvg,
					manualSetupKey,
					clearSetupData,
					fetchSetupData,
					errors
				})
			]
		})
	] });
}
Security.layout = { breadcrumbs: [{
	title: "Security settings",
	href: edit()
}] };
//#endregion
export { Security as default };

//# sourceMappingURL=security-CFZnLLPF.js.map