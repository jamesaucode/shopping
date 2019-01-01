import React, { Component } from 'react'
import checkedIcon from "../image/checked.png";
import uncheckedIcon from "../image/unchecked.png";
import trashIcon from "../image/trash.png";

export default class Item extends Component {
    render() {
        const { checked, product, quantity, note, onEditClick, onToggleChecked, handleDeleteClick } = this.props;
        var listItemStyle = ''
        if (checked) {
            listItemStyle = 'listItem listItem--unchecked'
        } else {
            listItemStyle = 'listItem'
        }
        return (
            <div onClick={onEditClick} className={listItemStyle}>
                <div className="listItem--editable">
                    {checked ? <p className="p--strike"><strike>{product}</strike></p> : <p>{product}</p>}
                    <div>
                        {checked ? (
                            <img
                                onClick={onToggleChecked}
                                className="icon"
                                alt="Checked"
                                src={checkedIcon}
                            />
                        ) : (
                                <img
                                    onClick={onToggleChecked}
                                    className="icon"
                                    alt="Unchecked"
                                    src={uncheckedIcon}
                                />
                            )}
                        <img
                            alt="Trash icon"
                            onClick={handleDeleteClick}
                            className="icon"
                            src={trashIcon}
                        />
                    </div>
                </div>
                {!checked &&
                    <div>
                        <p className="notes">Quantity: {quantity}</p>
                        {note.trim().length > 0 && <p className="notes">Note: {note}</p>}
                    </div>
                }
            </div>
        )
    }
}
