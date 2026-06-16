interface UndoToastProps {
  message: string
  onUndo: () => void
}

export function UndoToast({ message, onUndo }: UndoToastProps) {
  return (
    <div className="undo-toast" role="status">
      <span>{message}</span>
      <button type="button" className="btn btn-small undo-toast-btn" onClick={onUndo}>
        Undo
      </button>
    </div>
  )
}
