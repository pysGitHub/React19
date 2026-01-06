import React from 'react';
import './index.scss'
import { useNavigate } from 'react-router-dom';
import type { MenuItem } from '../../../components/layout-menu';
import { useDispatch } from 'react-redux';
import { setKanbanData } from '../../../store/modules/kanban';
import type { AppDispatch } from '../../../store';

export interface KanbanCardProps {
    title: string;
    description: string;
    path: string;
    menuData?: MenuItem[];
}


const KanbanCard: React.FC<KanbanCardProps> = (props) => {
    const dispatch = useDispatch<AppDispatch>()

    const { title, description, path, menuData } = props;
    const navigate = useNavigate();
    const navigateNextPage = () => {
        dispatch(setKanbanData(menuData))
        navigate(path)
    }

    return (
        <div onClick={() => { navigateNextPage() }} // NOSONAR
            className='kanban-card'
        >
            <h2><strong>{title}</strong></h2>
            <ul>
                <li>{description}</li>
                <li>{path}</li>
            </ul>
        </ div>
    )
}
export default React.memo(KanbanCard);